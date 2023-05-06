import auth from '@react-native-firebase/auth';

import { Alert } from 'react-native';
import { useFunc } from '../functions/useFunc';
import { Person } from '../../entities/Person';
import { LINK_URL, LOGO_URL } from '../../constants';
import { useDispatch } from 'react-redux';
import { setSignupMsg, setUser } from '../../data/redux/slices/login';

type UserLogin = Pick<Person, 'email' | 'password'>;

export const useAuth = () => {
	const { createDlink,callFunc } = useFunc();
	const dispatch = useDispatch();

	const _login = async ({ email, password }: UserLogin) => {
		try {
			await auth().signInWithEmailAndPassword(email, password);
		} catch (error) {
			Alert.alert('Error', 'Sorry wrong password or email');
			console.log('====================================');
			console.log(error);
			console.log('====================================');
		}
	};
	const actionLink = async (
		link: string,
		socialTitle: string,
		socialDescription: string,
	) => {
		
		const url = await createDlink(
			link,
			LOGO_URL,
			socialTitle,
			socialDescription,
			true,
			
		);

		return url;
	};
	const _restPasswordAccount = async (
		data: Pick<UserLogin, 'email'>,
		dLink?: string,
	) => {
		const {email}=data
		const { user } = await callFunc({ email }, 'regUser');
		if(user){

			const url =
				dLink ||
				(await actionLink(
					`${LINK_URL}?type=1&id=${user.uid}`,
					'Reset password Code for Hms:App',
					'Click Reset password Code to verify your Hms:App account',
				));
			const actionCodeSettings = { url };
			await auth()
				.sendPasswordResetEmail(email, actionCodeSettings)
				.then(() => {
					console.log('====================================');
					console.log('reset  email sent', email);
					console.log('====================================');
				})
				.catch((error) => {
					console.log('====================================');
					Alert.alert('Error', 'Sorry wrong email');
					console.log(error);
					console.log('====================================');
				});
		}else{
			Alert.alert('Error', `${email} does not exist on Hms:App`);

		}
		// setConfirm(confirmation);
	};

	const _sendEmailVerification = async () => {
		const user = auth().currentUser;
		const url = await actionLink(
			`${LINK_URL}?id=${user.uid}&type=1`,
			'Verification Code for Hms:App',
			'Click Verification Code to verify your Hms:App account',
		);
		console.log('url ', url);

		const actionCodeSettings = { url };
		await user
			.sendEmailVerification(actionCodeSettings)
			.then(() => {
				dispatch(setSignupMsg(new Date().toString()));

				console.log('====================================');
				console.log('reset  email sent ', user?.email);
				console.log('====================================');
			})
			.catch((error) => {
				console.log('====================================');
				console.log('reset  email error ', error);
				console.log('====================================');
			});
		return;
		// setConfirm(confirmation);
	};
	const _signUp = async (
		email: string,
		password: string,
		data: any,
		signupCallback: (obj: any, data: any) => void,
	) => {
		try {
			const current = await auth().createUserWithEmailAndPassword(
				email,
				password,
			);
			await _sendEmailVerification();
			const {
				user: { uid },
			} = current;
			signupCallback(null, { ...data, uid });
		} catch (err) {
			console.log('sign in err in ', err);
			signupCallback(err, null);
		}
	};
	const _logOut = async () => {
		try {
			await auth().signOut();
		} catch (error) {
			console.log('_logOut:err', error);
			dispatch(setUser({ reAuth: true }));
		}
	};

	return {
		_login,
		_logOut,
		_signUp,
		_restPasswordAccount,
		_sendEmailVerification,
	};
};
