import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, Props } from 'react-native-paper';
import { colors } from '../../theme/colors';

const Button = (
	props: Props & {
		children: string;
		onPress: () => void;
	},
) => {
	const {
		children,
		// @ts-ignore
		mode = 'contained',
		style,
	} = props;

	if (mode == 'outlined') {
		return (
			<PaperButton
				mode={mode}
				// @ts-ignore
				style={{ ...style, ...btnStyles.SignUpButton }}
				{...props}
			>
				{children}
			</PaperButton>
		);
	}
	return (
		<PaperButton
			mode={mode}
			textColor='white'
			{...props}
			// @ts-ignore
			style={{ ...style, ...btnStyles.loginButton }}
		>
			{children}
		</PaperButton>
	);
};
export default memo(Button);
const btnStyles = StyleSheet.create({
	loginButton: {
		paddingVertical: 2,
		borderRadius: 4,
		color: 'white',
		minWidth: '45%',
	},
	SignUpButton: {
		paddingVertical: 2,
		borderRadius: 4,
		borderColor: colors.primary,
		color: 'white',
		minWidth: '45%',
	},
});
