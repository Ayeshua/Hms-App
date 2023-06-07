import { useCallback, useRef, useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridView from '../../components/GridView';
import { unionBy } from "lodash";
import useFBDocs from '../../hooks/use-store/useFBDocs';
import { inputBasePayload,tokenObj } from '../../constants';
import { useInputSheet } from '../../hooks/useInputSheet';
import { customDateEqual } from '../../utils/custom-compare';
import { setDoctors, setRegistrars } from '../../data/redux/slices/entities';
import useNavOptions from '../../hooks/useNavOptions';
import { colors } from '../../theme/colors';
import '../../components/ActionSheets/input-sheet';
import '../../components/ActionSheets/opt-sheet';
const icons = [
    {
        name: 'plus-box-outline',
        color: colors.primary,
        size: 23,
    },
];
const AdminList = ({ navigation,route:{name,params} }) => {
    const {
		screenName = name,
	
	} = params || {};
	console.log('screenName ',screenName);
	
	const {arr:entities} = useSelector(({ entity }) => {
		return entity[`${screenName}s`]
	},customDateEqual);

	const {dispatchDLink, openShareInput}=useInputSheet()

	const [searchReadings, setSearchReadings] = useState<any>();
	const lastDocRef = useRef();
	const listDocRef = useRef([]);
	const mounted = useRef(false);
	const [isLoading, setLoading] = useState(false);
	const [isSpinner, setSpinner] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const dispatch=useDispatch()
	const onListClick = async ({value:emails,customTokens}) => {
		dispatchDLink(emails,`HmsApp Assign`,'Assign','addShare',{
            name:'role',
			role: customTokens,
        })
	}
	const onClickFun = useCallback(({ index, num },addItem?:any,picker?:any) => {
        let item = addItem
        if(index!==-1){

            item=entities[index]
        }
		if(num!==undefined){
			const tokens=tokenObj[picker||screenName]
			const customTokens=picker?tokens.reduce((cal:{},val:string)=>{
                return {...cal,[val]:false}
            },{}):item[picker||'role']
			openShareInput({
				...inputBasePayload,
				title: 'Assign',
				btnLabel:'Assign',
				value: item.email,
				tokens,
				customTokens,
				onListClick
			})
			
		}else{
			navigation.navigate('Info',{
				info:item,
				userId:item[`${screenName.toLowerCase()}Id`],
				categoryId:item.categoryId,
				screenName:`${screenName}s`
			})
		}
	},[screenName]);
    const iconPress=useCallback(()=>{
		console.log('iconPress');
		
		onClickFun({index:-1,num:-1},{email:''},'def')
	},[])
	const startSearch = useCallback(
		(lastDoc:any) => {
			setLoading(true);
			setSearchReadings({
				path: screenName,
				lastDoc,
				boolValue: { value: `roleVal`, key: true },
				origin:1
			});
		},
		[screenName],
	);
	const loadMore = () => {
		if (!isLoading && hasMore) {
			setLoading(true);
			console.log('startSearch loadMore ');

			startSearch(
				lastDocRef.current || entities.length > 0
					? entities[entities.length - 1]?._id
					: null,
			);
		}
	};
	useEffect(() => {
		startSearch( null);

		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, [startSearch]);
	const onViewableItemsChanged = ({ viewableItems }) => {
		//console.log('Visible items are', viewableItems);
		try {
			if (viewableItems) {
				const len = viewableItems.length;

				const { key, index } = viewableItems[len - 1];

				if (
					key &&
					key === lastDocRef.current &&
					entities.length > 15 &&
					index < entities.length - 5 &&
					!listDocRef.current.includes(key)&&
					!isLoading && hasMore
				) {
					
					listDocRef.current = [...listDocRef.current, key];
					startSearch(key);
				}
			}
		} catch (error) {}
	};
	
	const readingCallback = useCallback(
		(data) => {
			const len = data.length;
			if (mounted.current) {
				setLoading(false);
				setSpinner(false);
				setSearchReadings(null);
				setHasMore(len > 0);
			}
			if (len > 0) {
				lastDocRef.current = data[len - 1].id;
			}
			console.log('admin data ',data);
			
			const arr = unionBy(data, entities, 'id')/* .filter((val)=>val[name]) */;
			if(screenName==='Doctor'){
				dispatch(setDoctors({arr,updatedAt:new Date().getMilliseconds() }))
			}else{
				dispatch(setRegistrars({arr,updatedAt:new Date().getMilliseconds() }))

			}

		},
		[entities, screenName],
	);
	useFBDocs(searchReadings, readingCallback);
    useNavOptions(
		navigation,
		30,
		icons,
		iconPress,
		`${screenName}s`,
	);
    
	return (
		<GridView
			{...{
				profileInfo: entities,
				orientation: 'row',
				onClickFun,
				isLoading,
				isSpinner,
				loadMore,
				onViewableItemsChanged,
				screenName:`${screenName}s`
			}}
		/>
	);
};

export default AdminList;
