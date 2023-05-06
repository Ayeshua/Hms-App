import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { screenStyles } from '../styles';

const Loader = () => (
	<View style={screenStyles.center}>
		<ActivityIndicator />
	</View>
);

export default Loader;
