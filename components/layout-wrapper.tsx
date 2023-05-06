import React, { memo } from 'react';
import { View } from 'react-native';

const LayoutWrapper = ({
	children,
	styles,
	...props
}: {
	styles?: {};
	children: React.ReactNode;
}) => {
	return (
		<View style={{ ...styles, backgroundColor: 'white' }} {...props}>
			{children}
		</View>
	);
};
export default memo(LayoutWrapper);
