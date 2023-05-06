import React, { memo } from 'react';
import { View } from 'react-native';
import { screenStyles } from '../styles';

const WrapContent = ({ children, width, flexWrap }) => {
	return (
		<View
			style={{
				...screenStyles.row,
				width: width || '100%',
				//alignItems: 'center',
				flexWrap: flexWrap || 'wrap',
				paddingVertical: 2,
				paddingHorizontal: 10,
			}}
		>
			{children}
		</View>
	);
};

export default memo(WrapContent);
