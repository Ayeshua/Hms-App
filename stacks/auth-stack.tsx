import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword } from '../screens/account/rest-password';
import { AuthLink } from '../screens/auth-link';
import { Login } from '../screens/login';
import { SignUp } from '../screens/signup';

const Stack = createNativeStackNavigator();
export const AuthStack = () => (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen options={{}} name='Login' component={Login} />
			<Stack.Screen options={{}} name='AuthLink' component={AuthLink} />
			<Stack.Screen options={{}} name='SignUp' component={SignUp} />

			<Stack.Screen
				options={{}}
				name='ForgotPassword'
				component={ForgotPassword}
			/>
		</Stack.Navigator>
	);

