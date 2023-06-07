import { memo } from 'react';
import { Title } from 'react-native-paper';
import { Image, View } from 'react-native';
import { screenStyles } from '../styles';

const Header = ({ title, showImg, color, elipse }) => (
	<View
		style={{
			...screenStyles.row,
			//backgroundColor: bg,
			alignItems: 'center',
			height: 50,
		}}
	>
		{showImg && (
			<Image
				source={require('../assets/adaptive-icon.png')}
				style={{ width: 50, height: 50 }}
			/>
		)}
		<Title numberOfLines={1} style={{ color }}>
			{elipse && title?.length > 10 ? `${title.substring(0, 13)}...` : title}
		</Title>
	</View>
);

export default memo(Header);
