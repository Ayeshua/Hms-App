import { memo } from 'react';
import { View } from 'react-native';
import { screenStyles } from '../styles';
import { colors } from '../theme/colors';
import Dot from './dot';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgHolder = ({
	payload,
	onClick,
	width,
	padding,
	orientation = 'row',
	height,
	justifyContent = 'space-between',
	value,
}: {
	payload: any;
	onClick: () => void;
	width: number | string;
	height?: number | string;
	padding?: number;
	orientation?: string;
	justifyContent?: string;
	value: number;
}) => {
	const {
		name,
		color,
		size = 24,
		disabled,
		_id,
		bg = colors.TRANSPARENT,
		rotate,
	} = payload;
	return (
		<View
			style={{
				...screenStyles[orientation],
				width,
				height,
				justifyContent,
				alignItems: 'center',
				padding: padding || 0,
			}}
		>
			<View>
				<CircularProgress
					radius={size}
					value={value}
					activeStrokeColor={colors.primary}
					inActiveStrokeColor={'#fff'}
					inActiveStrokeOpacity={0.4}
					duration={3000}
				/>
				<Dot
					key={_id || name}
					size={size}
					bg={bg}
					rotate={rotate}
					color={'white'}
					iconSize={size}
					disabled={disabled}
					iconColor={color}
					iconName={name}
					handlePress={onClick}
					customStyle={{
						position: 'absolute',
						left: 22,
						top: 22,
					}}
				/>
			</View>
		</View>
	);
};

export default memo(ProgHolder);
