
import { NavigationContainer } from '@react-navigation/native';
import AuthIsLoaded from '../AuthIsLoaded';
import { shallowEqual, useSelector } from 'react-redux';
import { AuthStack } from './auth-stack';
import { ProStack } from './pro-stack';
import MainStack from './main-stack';


const AppContainer = ({ appIsReady, SplashScreen }) => {
	const { emailVerified, status } = useSelector(({login:{
		user: { emailVerified, status },
	}}) => {
		return { emailVerified, status }
	},shallowEqual);
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
