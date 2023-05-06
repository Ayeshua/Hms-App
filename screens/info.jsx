

import { useCallback, useEffect, useMemo, useState } from 'react';
import { NestedObjToInfoString } from '../utils/renderText';
import GridView from '../components/GridView';
import { useSelector, useStore } from 'react-redux';
import { profileInfo } from '../constants';
import { reorder } from '../utils/reorder';
import { useFocusEffect } from '@react-navigation/native';
import useNavOptions from '../hooks/useNavOptions';

const Info = ({ route: { params, name }, navigation }) => {
	const {
		info,
		screenName = name,
		userId,
		categoryId,
		from,
	} = params || {};
	const { user } = useSelector(({ login }) => login);
	const {categoryId:catId}=user
	const [profile, setprofile] = useState();
	const { queryDoc } = useStore();

	const [topItem, setTopItem] = useState()
	const onClickFun = ({ index, num }, flag) => {
		
	};
	const iconClick = useCallback(() => {
		navigation.navigate('ProStack', {
			screen: 'Boarding',
			params: { start: 0 },
		});
	},[]);
	
	const payload = useMemo(() => {
		if (catId !== 'Doctor') {
			return profileInfo;
		} else {
			return reorder(profileInfo, 1, null, 1, true);
		}
	}, [profileInfo, catId]);
	useFocusEffect(
		useCallback(() => {
			let  infoData;
			console.log('refresh ');
			
			if (screenName === 'Profile') {
				if (profile) {
					const {
						name,
						email,
						gender,
						idNumber,
						categoryId,
						speciality,
						age=0,
						phone,
						profileUrl
					} = profile;
					
					infoData = {
						whiteBg:true,
						customStyle:{width:'90%',margin:'5%'},
						url:profileUrl,
						iconName:'account-box-outline',
						iconClick,
						info:NestedObjToInfoString({ 
						name, 
						agender:`${gender} | ${age||''} | ${categoryId||''}| ${speciality||''}`, 
						idNumber,
						email,
						phone ,
					})}
					
				}
			} else {
				
				infoData =  info ;
			}
			setTopItem(infoData)
		}, [info, screenName, profile]),
	);

	const userCallback = useCallback((user) => {
		console.log('user ',user);
		setprofile(user);
	}, []);

	useEffect(() => {
		if (screenName === 'Profile') {
			if (!userId) {
				setprofile(user);
			} else {
				queryDoc(`${categoryId}/${userId}`, userCallback);
			}
		}
	}, [userId, user, userCallback]);
	useNavOptions(
		navigation,
		from ? 30 : 0,
		null,
		null,
		screenName,
	);
	return <GridView
		{...{
			profileInfo: payload,
			onClickFun,
			
			header:'Records',
			topItem, 
			subName:'name',
			numColumns:2
		}}
	/>
};

export default Info;
