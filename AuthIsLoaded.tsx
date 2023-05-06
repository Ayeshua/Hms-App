import React,{ useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { setUser } from './data/redux/slices/login';

import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { RootState } from './data/redux/store';
import { useStore } from './hooks/use-store';
import { pick } from 'lodash';
//import useFBDocs from './hooks/useFBDocs';

//import { signup, saveUserToFirestore, signout } from '../actions';
function AuthIsLoaded({ children, appIsReady, SplashScreen }) {
	const { user } = useSelector((state: RootState) => state.login);
	const { reAuth } = user;
	console.log('user ', reAuth, ' appIsReady ', appIsReady);
	const { queryDoc } = useStore();
	const dispatch = useDispatch();

	const userCallback = (data: any, obj: any) => {
		console.log('userCallback ', obj, ' data ',data );

		if (data) {
			console.log('userCallback data ',data );

			dispatch(setUser({ 
				...data,					
			...obj 
		}));
			/* console.log('userCallback inner', data);
			setSearchData({
				path: `users/<uid>/${
					data.categoryId === 'Teacher' ? 'Schools' : 'staff'
				}`,
				subPath: 'users/<uid>',
			}); */
		}
	};
	// Handle user state changes
	const onAuthStateChangedFunc = (currentUser: any) => {
		console.log('currentUser ', currentUser);
		const reAuth = true;
		if (currentUser) {
			console.log('currentUser in ');
			currentUser.getIdTokenResult(true).then(async(idTokenResult: any) => {
				const { 
					categoryId,
					status 
				} = idTokenResult.claims;
				console.log('currentUser idTokenResult.claims ',idTokenResult.claims);
				
				/* const res= await callFunc({ email:currentUser.email, payload:{'status':1} }, 'addCustom');
				console.log('claim res ',res); */
				const userId=currentUser.uid
				const extras = {
					...pick(currentUser, ['uid', 'emailVerified', 'email']),
					reAuth,
					status,
					categoryId,
					userId
				};
				dispatch(setUser({ ...user, ...extras }));
				queryDoc(`${categoryId}/${userId}`, userCallback, extras);
			});
		} else {
			//dispatch(setCurrentMeter(null))

			dispatch(
				setUser({
					reAuth
				}),
			);
		}
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChangedFunc);
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

	/* const handleDynamicLink = (link) => {
		console.log('onLink ', link);
		if (link?.url) {
			console.log('onLink .url ', link.url);
			dispatch(setDlink(link.url));
		}
	};

	useEffect(() => {
		dynamicLinks().getInitialLink().then(handleDynamicLink);
		const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
		return () => unsubscribe();
	}, [handleDynamicLink]); */
	/* const callback = useCallback((data: any) => {
		console.log('data meters ', data.length);

	}, []); */
	//useFBDocs(searchData, callback);

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
