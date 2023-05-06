import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import AvatarIcon from '../../components/avatar-icon';
import Button from '../../components/buttons/custom-button';
import ConfirmationModal from '../../components/dialog/confirmation';
import ErrorBox from '../../components/errorBox';

import { useAuth } from '../../hooks/auth/useAuth';

export const ForgotPassword = ({ navigation }: any) => {
	const [state, setState] = useState<{
		email: string | null;
	}>({
		email: null,
	});

	const [isResettingPassword, setResetting] = useState<boolean>(false);
	const [VerificationEmailSentModel, setVerificationEmailSentModel] =
		useState(false);
	const { _restPasswordAccount } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
		},
	});

	return (
			<View style={styles.mainContainer}>
				<ScrollView>
            <View
					style={{
						marginTop: 30,
						width: '70%',
						alignSelf: 'center',
					}}
				>
					<AvatarIcon />
					<View>
						<Title style={styles.title}>Rest Password</Title>
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
						</View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<Button
								mode='contained'
								onPress={handleSubmit((data) => {
									setResetting(true);
									_restPasswordAccount(data).then(() => {
										setState({
											email: data.email,
										});
										setResetting(false);

										setVerificationEmailSentModel(true);
									});
								})}
								loading={isResettingPassword}
								disabled={isResettingPassword}
								textColor='#fff'
							>
								Reset
							</Button>
						</View>
					</View>
					</View>
				</ScrollView>
				<ConfirmationModal
					title={`Reset link sent: ${state?.email?.toLowerCase()}`}
					visible={VerificationEmailSentModel}
					message="If you don't see it check your spam"
					onConfirm={() => navigation.goBack()}
					onConfirmText='OK'
					onDismiss={() => setVerificationEmailSentModel(false)}
				/>
			</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1, backgroundColor: '#fff'
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
