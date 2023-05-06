import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const CustomFAB = ({
	bg,
	icon,
	color,
	onPress,
	disabled,
}: {
	bg: string;
	icon: string;
	color: string;
	onPress: () => void;
	disabled: boolean;
}) => {
	return (
		<FAB
			style={{ ...styles.fab, backgroundColor: bg }}
			small
			{...{ icon, color, onPress, disabled }}
		/>
	);
};
export default memo(CustomFAB);
const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		borderRadius: 100,
		right: 0,
		bottom: 10,
		color: 'white',
		backgroundColor: 'red',
	},
});
