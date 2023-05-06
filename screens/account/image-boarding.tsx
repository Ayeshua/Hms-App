import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../components/courosel';
import CarouselItem from '../../components/courosel/CouroselItem';
import ProgHolder from '../../components/prog-holder';
import { profileImages, url } from '../../constants';
import uploadFile from '../../hooks/storage/useUploadFile';
import { colors } from '../../theme/colors';
import { useStore } from '../../hooks/use-store';
import { setUser } from '../../data/redux/slices/login';
import { useFunc } from '../../hooks/functions/useFunc';
import { reorder } from '../../utils/reorder';
import { useMe } from '../../hooks/useMe';
import Badge from '../../components/badge';

const ImageBoarding = ({ navigation, route: { params } }) => {
	const { start } = params || {};
	const pos = useRef(0);
	const { user } = useSelector(({ login }) => login);
	const [files, setFiles] = useState({});
	const [value, setValue] = useState(0);
	const dispatch = useDispatch();
	const { addModData } = useStore();
	const { callFunc } = useFunc();
	const { _updatePhotoUrl } = useMe();
	const images = useMemo(() => {
		if (start) {
			const imgs = reorder(profileImages, 0, profileImages[start]);
			return reorder(imgs, start, profileImages[0]);
		} else {
			return profileImages;
		}
	}, [start]);
	const urls = useMemo(() => images.map(({ value }) => value), [images]);
	const setProgCallback = (prog, val) => {
		console.log('val ',val );
		
		setValue(val);
	};
	const setStatus=async(payload:any,path:string)=>{
		const {status,createdAt, userId,email}=payload
		if (!start && status === 3) {
			setValue(0)
			await callFunc({ email, payload:{status} }, 'addCustom');
		}
		if(path){

			const date = new Date();
			setValue(50)

			await addModData(
				{
					...payload,
					status,
					timestamp: date,
				},
				userId,
				user.categoryId,
				['status', path,'timestamp'],
			);
		}
		setValue(80)

		dispatch(
			setUser(payload),
		);
		console.log('navigation start ',start);
	}
	const saveUser = useCallback(async (payload, path) => {
		//const {}
		const status = Math.max(3,payload.status);
		
		if (path === 'profileUrl'&&payload[path]) {
			await _updatePhotoUrl(payload[path]);
		}
		setStatus({
			...payload,
			status,
		},path)
	}, []);
	const elementPressed = async () => {
		const path = urls[pos.current];
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});
		console.log('result ', path, ' pos.current ', pos.current, ' urls ', urls);
		if (!result.canceled) {
			const { uri } = result.assets[0];
			setFiles({ ...files, [path]: uri });
			setValue(0);

			uploadFile(
				[{ parent: true, uri, key: path }],
				user,
				setProgCallback,
				saveUser,
				path,
			);
		}
	};
	const onBoarding = useMemo(() => {
		return images.reduce((cal, item) => {
			const { value, title } = item;

			return [
				...cal,
				{
					uri: files[value],
					url: user[value] || url,

					title,
				},
			];
		}, []);
	}, [files, user]);

	useEffect(
		() =>
			navigation.addListener('beforeRemove', (e) => {
				console.log('pass the start ', start);
				if (start !== undefined) {
					// If we don't have unsaved changes, then we don't need to do anything
					return;
				}
				console.log('pass the dutch ', start);
				// Prevent default behavior of leaving the screen
				e.preventDefault();
			}),
		[navigation, start],
	);
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<Carousel
					data={onBoarding}
					refresh={0}
					closeBtn={start !== undefined}
					setPos={(idx) => {
						pos.current = idx;
						setValue(user[urls[idx]] ? 100 : 0);
					}}
					Compo={CarouselItem}
					stat={false}
				/>
			</View>
			<ProgHolder
				{...{
					payload: {
						name: 'pencil-circle',
						color: colors.primary,
						size: 54,
						bg: '#fff',
					},
					width: '100%',
					value,
					justifyContent: 'center',
				}}
				//width={60}
				onClick={elementPressed}
			/>
			<Badge
				{...{
					borderRadius:  10,
					bg: colors.primary,
					right: 30,
					bottom: 30,
					num: `>`,
					size: 30,
					disabled:false,
					onClick:()=>setStatus({...user,status:Math.max(3,user.status)},!start?'start':null)
				}}
			/>
		</View>
	);
};

export default ImageBoarding;
