import auth from '@react-native-firebase/auth';

export const useMe = () => {
	const _updateEmail = async (email: string) => {
		await auth()
			.currentUser.updateEmail(email)
			.then(() => {
				console.log('update email', email);
			});
	};

	const _updatePassword = async (password: string) => {
		await auth()
			.currentUser.updatePassword(password)
			.then(() => {
				console.log('update password', password);
			})
			.catch((err) => {
				console.log('====================================');
				console.log(err);
				console.log('====================================');
			});
	};
	const _updatePhotoUrl = async (url: string) => {
		await auth()
			.currentUser.updateProfile({
				photoURL: url,
			})
			.then(() => {
				console.log('update photo ', url);
			})
			.catch((err) => {
				console.log('====================================');
				console.log(err);
				console.log('====================================');
			});
	};

	const _updateUser = async ({ name }: { name: string }) => {
		await auth()
			.currentUser.updateProfile({
				displayName: name,
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteCurrentUser = async () => {
		await auth().currentUser.delete();
	};

	return {
		_updateUser,
		deleteCurrentUser,
		_updateEmail,
		_updatePassword,
		_updatePhotoUrl,
	};
};
