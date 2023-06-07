import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { screenStyles } from '../styles';
import { colors } from '../theme/colors';
import { startCase } from 'lodash';
const TopLabel = ({
	label,
	name,
	color,
	justifyContent,
	closeFun,
	customStyle = {},
	closeBtn,
	iconName = 'close-box',
	iconColor = 'red',
	backgroundColor = colors.coolGray2,
	height = 22,
	pos,
}) => (
		<View
			style={{
				...screenStyles.row,
				...screenStyles.p_5_10,
				...customStyle,
				alignItems: 'center',
				justifyContent,
				height,
				backgroundColor,
			}}
		>
			{closeBtn && (
				<TouchableOpacity
					style={{ marginRight: 5 }}
					onPress={() => closeFun(pos)}
				>
					<MaterialCommunityIcons
						{...{ name: iconName, color: iconColor }}
						size={20}
					/>
				</TouchableOpacity>
			)}
			<View>
				<Text style={{ color }}>{startCase(label)}</Text>
				{name && (
					<Text
						variant='labelSmall'
						style={{ color: colors.primary, marginTop: 2 }}
					>
						{startCase(name)}
					</Text>
				)}
			</View>
		</View>
	);

export default memo(TopLabel);
