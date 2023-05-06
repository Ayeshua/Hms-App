import React, { memo } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons/build/Icons';
import { View } from 'react-native';
import { colors } from '../theme/colors';

const CommonIcon = ({
	bg,
	color,
	size,
	iconColor,
	iconSize,
	iconName,
	disabled,
	rotate = '0deg',
	radius,
	margin = 3,
	customStyle = {},
}: {
	bg: string;
	color?: string;
	size?: number;
	iconColor?: string;
	iconSize?: number;
	radius?: number;
	margin?: number;
	iconName: string;
	disabled?: boolean;
	rotate?: string;
	customStyle?: any;
}) => (
	<View
		style={{
			borderRadius: radius || size / 2,
			height: size,
			width: size,
			backgroundColor: bg,
			borderColor: color || bg,
			borderWidth: 1,
			justifyContent: 'center',
			alignItems: 'center',
			margin,
			transform: [{ rotate }],
			...customStyle,
		}}
	>
		{iconName ? (
			<MaterialCommunityIcons
				name={iconName}
				size={iconSize}
				color={disabled ? colors.coolGray2 : iconColor || bg}
			/>
		) : null}
	</View>
);

export default memo(CommonIcon);
