import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import React, { memo } from 'react';
import { colors } from '../theme/colors';

const AvatarIcon = ({ name = 'account-box-outline' }: { name?: string }) => {
	return (
		<View>
			<Avatar.Icon
				size={80}
				style={{
					alignSelf: 'center',
					backgroundColor: 'white',
					marginBottom: 10,
				}}
				color={colors.primary}
				icon={name}
			/>
		</View>
	);
};
export default memo(AvatarIcon);
