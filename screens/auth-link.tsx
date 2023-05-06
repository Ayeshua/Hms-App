import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AvatarIcon from '../components/avatar-icon';
import Button from '../components/buttons/custom-button';
import LayoutWrapper from '../components/layout-wrapper';
import { differenceInHours } from 'date-fns';

import { useAuth } from '../hooks/auth/useAuth';
import { RootState } from '../data/redux/store';

export const AuthLink = ({navigation}) => {
	const {
		user: { email },
		signupMsg,
	} = useSelector((state: RootState) => state.login);
	const [isResettingPassword, setResetting] = useState<boolean>(false);

	const { _sendEmailVerification,_logOut } = useAuth();

	const sendLink = async () => {
		setResetting(true);
		await _sendEmailVerification();
		setResetting(false);
	};
	useEffect(() => {
		if (signupMsg) {
			const dateDiff = differenceInHours(new Date(), new Date(signupMsg));
			console.log('dateDiff ', dateDiff);

			if (dateDiff > 24) {
				sendLink();
			}
		}
	}, [signupMsg]);
	return (
		<LayoutWrapper>
			<View style={styles.mainContainer}>
				<AvatarIcon name={'shield-link-variant-outline'} />
				<View>
					<Title style={styles.title}>
						{isResettingPassword
							? `Sending to ${email}`
							: `Check ${email} for verification link, in inbox or spam/junk`}
					</Title>
					<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Button mode='outlined' onPress={async() => {
										await _logOut()
										navigation.replace('Login');
									}}>
										Login
									</Button>
									<Button
							mode='contained'
							onPress={sendLink}
							loading={isResettingPassword}
							disabled={isResettingPassword}
							textColor='#fff'
						>
							Send New Link
						</Button>
								</View>
					
				</View>
			</View>
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

	title: {
		paddingTop: 10,
		marginBottom: 20,
		alignSelf: 'center',
		color: 'black',
	},
});
