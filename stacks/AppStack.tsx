
import { NavigationContainer } from '@react-navigation/native';
import AuthIsLoaded from '../AuthIsLoaded';
import { RootState } from '../data/redux/store';
import { useSelector } from 'react-redux';
import { AuthStack } from './auth-stack';
import { ProStack } from './pro-stack';
import MainStack from './main-stack';


const AppContainer = ({ appIsReady, SplashScreen }) => {
	const {
		user: { emailVerified, status },
	} = useSelector((state: RootState) => state.login);
	console.log('current status ',status);
	
	return (
		<AuthIsLoaded {...{ appIsReady, SplashScreen }}>
			<NavigationContainer>
			{!emailVerified ? (
					<AuthStack />
				) : (
					<>
						{status === 1 || status === 2? (
							<ProStack {...{ status }} />
						) : (
							<MainStack />
						)}
					</>
				)}
			</NavigationContainer>
		</AuthIsLoaded>
	);
};

export default AppContainer;
