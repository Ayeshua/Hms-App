import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageBoarding from '../screens/account/image-boarding';
import Profile from '../screens/account/profile';

const Stack = createNativeStackNavigator();
export const ProStack = ({ status }) => (
		<Stack.Navigator
			screenOptions={{
				contentStyle: {
					backgroundColor: 'white',
				},
			}}
			initialRouteName={status === 1 ? 'Edit Profile' : 'Boarding'}
		>
			<Stack.Screen name='Edit Profile' component={Profile} />
			<Stack.Screen
				options={{
					headerShown: false,
					contentStyle: {
						backgroundColor: '#000',
					},
				}}
				name='Boarding'
				component={ImageBoarding}
			/>
		</Stack.Navigator>
	);

