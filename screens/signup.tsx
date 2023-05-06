import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Text, TextInput, Title } from 'react-native-paper';

import { Dropdown } from 'react-native-element-dropdown';
import { CATEGORY } from '../constants';

import AvatarIcon from '../components/avatar-icon';
import Button from '../components/buttons/custom-button';
import LayoutWrapper from '../components/layout-wrapper';
import ConfirmationModal from '../components/dialog/confirmation';
import ErrorBox from '../components/errorBox';

import { useAuth } from '../hooks/auth/useAuth';
import { screenStyles } from '../styles';
import { colors } from '../theme/colors';
import { isPasswordEqualConfirmPassword } from '../utils/isConfPasswordEqual';
import { useStore } from '../hooks/use-store';
import { useFunc } from '../hooks/functions/useFunc';
import { useMe } from '../hooks/useMe';

export const SignUp = ({ navigation }: any) => {
	const { _signUp, _login } = useAuth();
	const { callFunc } = useFunc();
	const { addModData } = useStore();
	const { _updateUser } = useMe();
	const [visible, setVisible] = useState<boolean>(false);

	const [modalMsg, setmodalMsg] = useState<any>();
	const [showPassword, setShowPassword] = useState(true);
	const [isSigningUp, setSigningUp] = useState(false);
	const saveCallback = () => {
		navigation.goBack();
	};
	const signupCallback = async (err, data) => {
		console.log('we are back ', data);

		if (data) {
			const date = new Date();
			const { categoryId, name, email ,uid} = data;

			await callFunc({ email, payload: { categoryId } }, 'addCustom');
			await _updateUser({ name: name.toLowerCase() });
			await addModData(
				{
					...data,
					name: name.toLowerCase(),
					timestamp: date,
				},
				uid,
				categoryId,
				['name', 'email', 'categoryId'],
			);
			saveCallback();
		} else if (err) {
			setmodalMsg({
				title: 'Error',
				warnMassage: err.message,
				onConfirmText: 'Okay',
			});
		}
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
			categoryId: 'Patient',
		},
	});

	return (
		<LayoutWrapper>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView>
					<View style={styles.mainContainer}>
						<View style={styles.keyboardAvoidingContainer}>
							<View
								style={{
									marginBottom: 10,
								}}
							>
								<AvatarIcon />
							</View>

							<View>
								<Title style={styles.title}>Sign Up</Title>
								<View>
									
									<View style={{ marginBottom: 20 }}>
										<Controller
											name='name'
											rules={{
												required: true,
												minLength: 4,
											}}
											control={control}
											render={({
												field: { onChange: handleChange, value },
											}) => (
												<TextInput
													mode='outlined'
													label={'Name'}
													placeholder='Name'
													value={value}
													onChangeText={handleChange}
													textContentType='username'
												/>
											)}
										/>
										<ErrorBox field='name' errors={errors.name} />
									</View>

									<View
										style={{
											marginBottom: 20,
										}}
									>
										<Controller
											control={control}
											rules={{
												required: true,
												pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
											}}
											render={({ field: { onChange, value } }) => (
												<TextInput
													mode='outlined'
													label={'Email'}
													placeholder='Email'
													style={styles.input}
													value={value}
													onChangeText={(character) => {
														return onChange(character.trim());
													}}
													clearButtonMode='always'
													textContentType='emailAddress'
												/>
											)}
											name='email'
										/>
										<ErrorBox field='email' errors={errors.email} />
									</View>
									<View
										style={{
											marginBottom: 20,
										}}
									>
										<Controller
											control={control}
											name='password'
											rules={{
												required: true,
												minLength: 5,
											}}
											render={({
												field: { onChange: handleChange, value },
											}) => (
												<TextInput
													mode='outlined'
													label={'Password'}
													value={value}
													onChangeText={handleChange}
													placeholder='Password'
													style={styles.input}
													textContentType='password'
													secureTextEntry={showPassword}
													clearButtonMode='always'
												/>
											)}
										/>
										<ErrorBox field='password' errors={errors.password} />
									</View>
									<View
										style={{
											marginBottom: 10,
										}}
									>
										<Controller
											control={control}
											name='confirmPassword'
											rules={{
												required: true,
												minLength: 8,
												validate: (value: string) =>
													isPasswordEqualConfirmPassword({
														control,
														value,
													}),
											}}
											render={({ field: { onChange, value } }) => (
												<TextInput
													mode='outlined'
													label={'Confirm Password'}
													placeholder='Confirm Password'
													style={styles.input}
													value={value}
													onChangeText={onChange}
													textContentType='password'
													secureTextEntry={showPassword}
													clearButtonMode='always'
												/>
											)}
										/>
										<ErrorBox
											field='confirmPassword'
											errors={errors.confirmPassword}
										/>
									</View>
									<View
										style={{
											flexDirection: 'row',
											alignContent: 'center',
											marginBottom: 20,
										}}
									>
										<Pressable
											// icon='eye'
											style={{
												borderColor: colors.primary,
												borderWidth: 1,
												padding: 3,
												marginRight: 5,
												borderRadius: 3,
											}}
											onPress={() => {
												setShowPassword(!showPassword);
											}}
										>
											<View
												style={{
													backgroundColor: !showPassword
														? colors.primary
														: undefined,
													borderRadius: 3,

													width: 16,
													height: 16,
												}}
											/>
										</Pressable>
										<Text
											onPress={() => {
												setShowPassword(!showPassword);
											}}
											style={{
												color: colors.primary,
												alignSelf: 'center',
												fontSize: 16,
											}}
										>
											Show Password
										</Text>
									</View>
								</View>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Button mode='outlined' onPress={() => navigation.goBack()}>
										Login
									</Button>
									<Button
										textColor='#fff'
										mode='contained'
										onPress={handleSubmit(async (data) => {
											const { email, password } = data;
											setSigningUp(true);
											const { user } = await callFunc(data, 'regUser');
											if (user) {
												await _login({ email, password });
												saveCallback();
											} else {
												_signUp(email, password, data, signupCallback);
											}
										})}
										loading={isSigningUp}
										disabled={isSigningUp}
									>
										Sign up
									</Button>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			<ConfirmationModal
				{...{ ...modalMsg, visible }}
				onConfirm={() => setVisible(false)}
			/>
			
		</LayoutWrapper>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		marginHorizontal: '5%',
		marginVertical: '16%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	keyboardAvoidingContainer: {
		width: '75%',
		display: 'flex',
		flexDirection: 'column',
	},

	keyboardAvoidingContainerDesktop: {
		width: '40%',
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		alignItems: 'center',
	},
	inputContainerDesktop: {
		marginLeft: '30%',
	},
	input: {
		color: '#000',
		marginBottom: 4,
		backgroundColor: 'white',
	},

	loginButton: {
		width: 120,
		paddingVertical: 2,
		borderRadius: 4,
		borderColor: '#0DA789',
	},
	SignUpButton: {
		width: 120,
		paddingVertical: 2,
		borderRadius: 4,
		backgroundColor: '#0DA789',
		color: '#0DA789',
	},
	title: {
		paddingTop: 10,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 20,
		alignSelf: 'center',
		color: 'black',
	},
	titleDesktop: {
		paddingTop: 10,
		fontSize: 35,
		fontWeight: 'bold',
		marginBottom: 20,

		color: 'black',
	},

	errorText: {
		color: 'red',
	},
});
