import { useCallback, useState, useMemo } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

import { shallowEqual, useSelector } from 'react-redux';
import useNavOptions from '../hooks/useNavOptions';
import { useAuth } from '../hooks/auth/useAuth';
import ConfirmationModal from '../components/dialog/confirmation';
import {  LOGO_URL } from '../constants';
import InputModal from '../components/dialog/text-area-dialog';
import { SheetManager } from 'react-native-actions-sheet';

import { cloudFunc } from '../hooks/functions/useFunc';

import { startCase } from 'lodash';

import Admin from '../screens/admin';
import CommonIcon from '../components/common-icon';
import {NewAppointment} from '../screens/new-appointment';
import Info from '../screens/info';
import Home from '../screens/home';
import Subs from '../screens/Subs';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = ({ navigation }) => {
	const { Doctor, Registrar, username, userId, profileUrl, email } = useSelector(({login:{
		user: { Doctor, Registrar, name: username, userId, profileUrl, email },
	}}) => {
		return { Doctor, Registrar, username, userId, profileUrl, email }
	},shallowEqual);
	const [showInputModal, setShowInputModal] = useState<boolean>(false);
	const [name, setname] = useState<string>();
	const isPatient=!Doctor&&!Registrar
	const [inputMsg, setinputMsg] = useState<any>();
	const [showConfirmationModal, setShowConfirmationModal] =
		useState<boolean>(false);
	const [modalMsg, setmodalMsg] = useState<any>();
	const { _logOut } = useAuth();
	const { shareDLink } = cloudFunc();


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
				if (name === 'Profile') {
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
	useNavOptions(
		navigation,
		name === 'Profile' ? 60 : 0,
		icons,
		iconPress,
		name !== 'Appointments'
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
				{(Registrar||Doctor)&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='emoticon-sick-outline' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						tabBarShowLabel: false,

					}}
					name='Patients'
					component={Subs}
				/>}
				{isPatient&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='medical-bag' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						tabBarShowLabel: false,

					}}
					name='Prescriptions'
					component={Subs}
				/>}
				{isPatient&&<Tab.Screen
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
				{(Registrar||isPatient)&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='cash-multiple' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Payments'
					component={Subs}
				/>}
				{Registrar&&<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialCommunityIcons name='account-group-outline' color={focused?colors.tertiary:colors.silver} size={25} />
						),
						            tabBarShowLabel: false,

					}}
					name='Admin'
					component={Admin}
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
