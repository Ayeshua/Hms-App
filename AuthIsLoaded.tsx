import { useCallback, useEffect, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import { setUser } from './data/redux/slices/login';

import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { RootState } from './data/redux/store';
import { useStore } from './hooks/use-store';
import { pick } from 'lodash';
import { DateTimeFormat } from './utils/date-formatter';
import { 
	setAppointments, 
	setCalendarData, 
	setListItems 
} from './data/redux/slices/entities';
import useFBDocs from './hooks/use-store/useFBDocs';
//import useFBDocs from './hooks/useFBDocs';

//import { signup, saveUserToFirestore, signout } from '../actions';
function AuthIsLoaded({ children, appIsReady, SplashScreen }) {
	const  reAuth  = useSelector((state: RootState) => state.login.user.reAuth);
	console.log('user ', reAuth, ' appIsReady ', appIsReady);
	const { queryDoc } = useStore();
	const dispatch = useDispatch();
	const searchData = useRef<any>();

	// Handle user state changes
	const onAuthStateChangedFunc = (currentUser: any) => {
		console.log('currentUser ', currentUser);
		const reAuth = true;
		if (currentUser) {
			console.log('currentUser in ');
			currentUser.getIdTokenResult(true).then(async(idTokenResult: any) => {
				const { 
					categoryId,
					status ,
					role={},
				} = idTokenResult.claims;
				console.log('currentUser idTokenResult.claims ',idTokenResult.claims);
				/* if(role.Registrar){
					searchData.current={
						path: `Doctors`,
						boolValue: { value: `roleVal`, key: true },
						origin:1
					};
				} */
				/* const res= await callFunc({ email:currentUser.email, payload:{'status':1} }, 'addCustom');
				console.log('claim res ',res); */
				const userId=currentUser.uid
				
				const payload= await queryDoc(`${categoryId}/${userId}`);
				dispatch(setUser({ 
					...payload, 
					...pick(currentUser, ['uid', 'emailVerified', 'email']),
					reAuth,
					...role,
					status,
					categoryId,
					userId
				}));
			});
		} else {
			searchData.current=undefined

			dispatch(
				setUser({
					reAuth,
					updatedAt:new Date().getTime() 
				}),
			);
			dispatch(setAppointments({
				updatedAt:new Date().getTime() 
			}))
			dispatch(setCalendarData({arr:[],updatedAt:new Date().getTime()}))
			dispatch(setListItems({
				data:{[DateTimeFormat(new Date(),'yyyy-MM-dd')]:[]},
				updatedAt:new Date().getTime() 
			}))
		}
	};
	const callback=useCallback(()=>{

	},[])
	useFBDocs(searchData.current, callback);

	useEffect(() => {
		const subscriber = auth().onUserChanged(onAuthStateChangedFunc);
		return subscriber; // unsubscribe on unmount
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady && reAuth) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady, reAuth]);

	if (!appIsReady || !reAuth) {
		return null;
	}
	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			{children}
		</View>
	);
}

export default AuthIsLoaded;
