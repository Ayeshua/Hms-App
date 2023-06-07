import { memo } from 'react';

import { TouchableOpacity } from 'react-native';
import Badge from './badge';
import CommonIcon from './common-icon';

const Dot = ({
	bg,
	color,
	size,
	iconColor,
	iconSize,
	iconName,
	rotate = '0deg',
	radius,
	margin = 3,
	handlePress,
	disabled,
	customStyle = {},
	badge,
}: {
	bg: string;
	color?: string;
	size?: number;
	iconColor?: string;
	iconSize?: number;
	badge?: any;
	radius?: number;
	margin?: number;
	iconName: string;
	handlePress?: () => void;
	disabled?: boolean;
	rotate?: string;
	customStyle?: any;
}) => (
	<TouchableOpacity
		style={customStyle}
		disabled={disabled}
		onPress={handlePress}
	>
		<CommonIcon
			{...{
				bg,
				color,
				size,
				iconColor,
				iconSize,
				iconName,
				rotate,
				radius,
				margin,
			}}
		/>
		{badge && (
			<Badge
				{...{
					borderRadius: (size - badge.left) / 2,
					bg: badge.bg || 'red',
					left: badge.left,
					top: badge.top,
					num: badge.num > 99 ? `${badge.num}+` : `${badge.num}`,
					size: size - badge.left,
				}}
			/>
		)}
	</TouchableOpacity>
);

export default memo(Dot);
