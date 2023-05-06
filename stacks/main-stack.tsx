import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProStack } from './pro-stack';
import AppStack from './app-stack';

import { colors } from '../theme/colors';
import AddPost from '../screens/home/add-post';
import { useSelector } from 'react-redux';
import { RootState } from '../data/redux/store';
import Info from '../screens/info';

const Stack = createNativeStackNavigator();
const MainStack = () => {
    const { headerShown } = useSelector((state: RootState) => state.menu);
	console.log(' headerShown ', headerShown);
  return (
    <Stack.Navigator
		screenOptions={{
			headerShown,
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTintColor: 'black',
			contentStyle: {
				backgroundColor: '#fff',
			},
		}}
	>
		<Stack.Screen name='AppStack' component={AppStack} />
		<Stack.Screen 
			options={{
				headerShown:false
			}} name='ProStack'
			component={ProStack} 
		 />
		<Stack.Screen name='Info' component={Info} />
		<Stack.Screen name='AddPost' component={AddPost} />
		
	</Stack.Navigator>
  )
}

export default MainStack