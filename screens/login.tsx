import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	View,
	ScrollView,
} from 'react-native';
import { Text, TextInput, Title } from 'react-native-paper';
import AvatarIcon from '../components/avatar-icon';
import Button from '../components/buttons/custom-button';
import LayoutWrapper from '../components/layout-wrapper';
import ErrorBox from '../components/errorBox';

import { useAuth } from '../hooks/auth/useAuth';
import { colors } from '../theme/colors';
import { RootState } from '../data/redux/store';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

export const Login = ({ navigation }: any) => {
	const [showPassword, setShowPassword] = useState(true);
	const [isLoadingIn, setLoading] = useState(false);
	const {
		user: { email },
	} = useSelector((state: RootState) => state.login);
	const { _login } = useAuth();

	
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	useFocusEffect(
		useCallback(() => {
			console.log('email ', email);
			if (email) {
				console.log('email inner ', email);
				navigation.replace('AuthLink');
			}
		}, [email]),
	);
	return (
		<LayoutWrapper>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView>
					<View style={styles.mainContainer}>
						<View style={styles.keyboardAvoidingContainer}>
							<AvatarIcon />
							<View>
								<Title style={styles.title}>Sign In</Title>
								<View>
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
											marginBottom: 40,
										}}
									>
										<Controller
											control={control}
											name='password'
											rules={{
												required: true,
												minLength: 6,
											}}
											render={({ field: { onChange, value } }) => (
												<TextInput
													mode='outlined'
													label={'Password'}
													placeholder='Password'
													style={styles.input}
													value={value}
													onChangeText={onChange}
													textContentType='password'
													clearButtonMode='always'
													right={
														<TextInput.Icon
															onPress={() => {
																setShowPassword(!showPassword);
															}}
															// @ts-ignore
															icon='eye'
														/>
													}
													secureTextEntry={showPassword}
												/>
											)}
										/>
										<ErrorBox field='password' errors={errors.password} />

										<Pressable
											onPress={() => {
												navigation.navigate('ForgotPassword');
											}}
										>
											<Text
												style={{
													color: colors.primary,
													marginTop: 5,
												}}
											>
												Forgot Password?
											</Text>
										</Pressable>
									</View>
								</View>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Button
										mode='outlined'
										onPress={() => {
											navigation.navigate('SignUp');
										}}
									>
										Sign up
									</Button>
									<Button
										mode='contained'
										onPress={handleSubmit((data) => {
											setLoading(true);
											_login(data).then(()=>{
												setLoading(false)
											});
										})}
										loading={isLoadingIn}
										disabled={isLoadingIn}
										textColor='#fff'
									>
										Login
									</Button>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</LayoutWrapper>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		marginHorizontal: '5%',
		marginTop: Platform.OS === 'web' ? '10%' : undefined,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	keyboardAvoidingContainer: {
		width: '75%',
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
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
		backgroundColor: 'white',
		marginBottom: 4,
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
