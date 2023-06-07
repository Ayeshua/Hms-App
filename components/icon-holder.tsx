import { memo } from 'react';
import { View } from 'react-native';
import { screenStyles } from '../styles';
import { colors } from '../theme/colors';
import Dot from './dot';

const IconHolder = ({
	payload,
	onClick,
	width,
	padding,
	orientation = 'row',
	height,
	justifyContent = 'space-between',
}: {
	payload: any;
	onClick: (num: number, name?: string) => void;
	width: number | string;
	height?: number | string;
	padding?: number;
	orientation?: string;
	justifyContent?: string;
}) => {
	return (
		<View
			style={{
				...screenStyles[orientation],
				width,
				height,
				justifyContent,
				alignItems: 'center',
				flexWrap: 'wrap',
				padding: padding || 0,
			}}
		>
			{payload.map(
				(
					{
						name,
						color,
						size = 24,
						disabled,
						_id,
						bg = colors.TRANSPARENT,
						rotate,
						badge,
					}: {
						name: string;
						color: string;
						size?: number;
						badge?: number;
						disabled?: boolean;
						_id?: string | null;
						bg?: string | null;
						rotate?: string | null;
					},
					index: number,
				) => (
					<Dot
						key={_id || name}
						{...{ size, bg, rotate, disabled, badge }}
						iconSize={size - (bg !== colors.TRANSPARENT ? 6 : 2)}
						iconColor={color}
						iconName={name}
						handlePress={() => onClick(index, name)}
					/>
				),
			)}
		</View>
	);
};

export default memo(IconHolder);
