import { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const Badge = (
	{ size = 20, left, top, right,bottom, bg, num,disabled=true,onClick }
	:
	{
		size:number;
		left?:number;
		top?:number;
		right?:number;
		bottom?:number;
		bg:string;
		num:string;
		disabled?:boolean;
		onClick?:()=>void
	}) => (
	<TouchableOpacity
		activeOpacity={.7}
		disabled={disabled}
		onPress={onClick}

		style={{
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			width: size,
			height: size,
			borderRadius: size / 2,
			left,
			top,
			right,
			bottom,
			backgroundColor: bg || 'red',
		}}
	>
		<Text style={{ color: '#fff' }} variant='bodySmall'>
			{`${num}`}
		</Text>
	</TouchableOpacity>
);

export default memo(Badge);
