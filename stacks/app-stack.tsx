import React,{ useCallback, useState, useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

import { useSelector } from 'react-redux';
import { RootState } from '../data/redux/store';
import useNavOptions from '../hooks/useNavOptions';
import { useAuth } from '../hooks/auth/useAuth';
import ConfirmationModal from '../components/dialog/confirmation';
import {  LOGO_URL } from '../constants';
import InputModal from '../components/dialog/text-area-dialog';
import { SheetManager } from 'react-native-actions-sheet';

import { useFunc } from '../hooks/functions/useFunc';

import { startCase } from 'lodash';
import Patients from '../screens/patients';
import Payments from '../screens/Payments';
import AdminStack from './admin-stack';
import Prescriptions from '../screens/Prescriptions';
import CommonIcon from '../components/common-icon';
import NewAppointment from '../screens/new-appointment';
import Info from '../screens/info';
import Home from '../screens/home';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = ({ navigation }) => {
	const {
		user: { categoryId, name: username, userId, profileUrl, email },
	} = useSelector((state: RootState) => state.login);
	const [inputMsg, setinputMsg] = useState<any>();
	const [showInputModal, setShowInputModal] = useState<boolean>(false);
	const [name, setname] = useState<string>();

	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
	const { _logOut } = useAuth();
	const { shareDLink } = useFunc();


	const menuOpt = useCallback((msg?: any) => {
		setmodalMsg(msg);
		//actionSheetRef.current?.hide();
		SheetManager.hide('list-menu-sheet');
		setShowConfirmationModal(!!msg);
	}, []);
	
	const icons = useMemo(() => {
		const arr = [
			{
				name: 'logout',
				color:  'black',
				size: 23,
			},
		];
		return name !== 'Profile'
			? arr
			: [
					{
						name: 'pencil',
						color: colors.primary,
						size: 23,
					},
					...arr,
			  ];
	}, [name]);

	const inputPayload = useCallback((payload: any) => {
		setinputMsg(payload);
		setShowInputModal(!!payload);
	}, []);
	const iconPress = useCallback(
		(num: number) => {
			console.log('name ', name, ' num ', num);
			const title='Logout'
			if (num) {
				menuOpt({
					title,
					message: `Are You sure you want to ${title}?`,
					onConfirmText: title,
				});
			} else {
				if (name === 'Staff') {
					inputPayload({
						title: 'Add',
						value: '',
						required: true,
						keyboardType: 'username',
						label: 'janedoe@example.com, johndoe@example',
						message: 'Enter email(s); seperated by comas',
						height: 100,
						onConfirmText: 'Add',
						onDismissText: 'Close',
					});
				} else if (name === 'Profile') {
					navigation.navigate('ProStack', { screen: 'Edit Profile' });
				} else {
					menuOpt({
						title,
						message: `Are You sure you want to ${title}?`,
						onConfirmText: title,
					});
				}
			}
		},
		[name, navigation, inputPayload],
	);
	//const { dLink } = useSelector(({ menu }) => menu);
	
	/* useEffect(() => {
		if (dLink) {
			let regex = /[?&]([^=#]+)=([^&#]*)/g,
				params = {},
				match: any;
			while ((match = regex.exec(dLink))) {
				params[match[1]] = match[2];
			}
			console.log('params ', params);

			const { id, type } = params;
			console.log('id ', id, ' type ', type);

			dispatch(setDlink(null));
			if (type === '0') {
				const { matrix, saved, _id } = currentTemplate || {};
				if (_id && _id !== id) {
					if (matrix && !saved) {
						menuOpt({
							title: 'Proccessing',
							message: 'wait...',
							dismissable: false,
						});
						console.log('screen shot start');

						const imgArr = getMatArr(matrix);
						console.log('imgArr ', imgArr);
						if (imgArr.length > 0) {
							uploadFile(
								imgArr,
								currentTemplate,
								setProgCallback,
								loopFileCallack,
							);
						} else {
							loopFileCallack(currentTemplate);
						}
						menuOpt(null);
					}
					dispatch(setCurrentTemplate(null));
					dispatch(setHtml('Loading...'));
				}
				dispatch(setSelElement(null));
				dispatch(setSelTool(null));
				navigation.navigate('Temp', {
					screen: 'ViewTemplate',
					params: { path: `users/${userId}/recieved/${id}` },
				});
			}
		}
	}, [dLink, loopFileCallack, menuOpt, setProgCallback]); */
	const handleAdd = async (emails: string) => {
		menuOpt({
			title: 'Inviting...',
			message: 'wait...',
			dismissable: false,
		});

		const subject = `Staff Member Invite`;

		const payload = {
			profileUrl,
			username,
			userId,
			email,
			url: 'https://firebasestorage.googleapis.com/v0/b/HmsApp-d4946.appspot.com/o/usericon.jpg?alt=media&token=39f9c7c3-031a-44ac-ae77-02b1236aafae',
		};
		const path = `users/${userId}/staff`;
		const body = `You have been added as staff member of ${startCase(
			username,
		)}`;
		const message = await shareDLink(
			emails,
			null,
			body,
			subject,
			path,
			payload,
			LOGO_URL,
		);

		menuOpt({
			title: 'Invite',
			message,
			onConfirmText: 'Okay',
		});
	};
	useNavOptions(
		navigation,
		name === 'New Appointment'?0:name !== 'Profile' ? 30 : 60,
		icons,
		iconPress,
		name === 'Profile' || name === 'New Appointment'
			? name
			: 'Hms:App',
		name !== 'Profile' && name !== 'New Appointment',
	);

	return (
		<>
			{inputMsg && (
				<InputModal
					{ ...inputMsg }
					visible={showInputModal}
					onConfirm={(txt: string) => {
						setinputMsg(null);
						if (inputMsg?.onConfirmText === 'Add') {
							handleAdd(txt);
						}
					}}
					onDismiss={() => {
						setinputMsg(null);
					}}
				/>
			)}
			{modalMsg && (
				<ConfirmationModal
					{ ...modalMsg }
					visible={showConfirmationModal}
					onConfirm={() => {
						if (modalMsg?.onConfirmText === 'Logout') {
							_logOut();
						} else {
							setShowConfirmationModal(false);
						}
					}}
					onDismiss={() => setShowConfirmationModal(false)}
				/>
			)}
			<Tab.Navigator
				initialRouteName='Appointments'
				backBehavior='history'
				keyboardHidesNavigationBar
				screenOptions={{
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
					  borderTopLeftRadius: 25,
					  borderTopRightRadius: 25,
					  shadowColor: "#000",
					  shadowOffset: {
						width: 0,
						height: -1,
					  },
					  shadowOpacity: 0.1,
					  shadowRadius: 10,
					  elevation: 10,
					},
					
				  }}
				screenListeners={({ route: { name } }) => setname(name)}
			>
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons
								name='calendar'
								color={focused?colors.tertiary:colors.silver}
								size={25}
							/>
						),
						            tabBarShowLabel: false,

					}}
					name='Appointments'
					component={Home}
				/>
				{(categoryId==='Registrar'||categoryId==='Doctor')&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='emoticon-sick-outline' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Patients'
					component={Patients}
				/>}
				{(categoryId==='Patient')&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='medical-bag' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Prescriptions'
					component={Prescriptions}
				/>}
				{(categoryId==='Patient')&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<CommonIcon
								{...{
									bg: !focused ? '#fff': colors.tertiary,
									size: 50,
									radius: 5,
									margin: 0,
									iconColor: !focused ? colors.primary : '#fff',
									iconSize: 30,
									iconName: 'plus-box-outline',

									customStyle: {
										position: 'absolute',
										top: -15,
										...styles.shadow,
									},
								}}
							/>
						),
						tabBarShowLabel: false,

					}}
					name='New Appointment'
					component={NewAppointment}
				/>}
				{(categoryId==='Registrar'||categoryId==='Patient')&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='cash-multiple' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Payments'
					component={Payments}
				/>}
				{(categoryId==='Registrar')&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='account-group-outline' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Staff'
					component={AdminStack}
				/>}
				
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons
								name='account-box-outline'
								color={focused?colors.tertiary:colors.silver}
								size={25}
							/>
						),
						            tabBarShowLabel: false,

					}}
					name='Profile'
					component={Info}
				/>
			</Tab.Navigator>
		</>
	);
};

export default AppBottomNavigation;
const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#7F5DF0',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
