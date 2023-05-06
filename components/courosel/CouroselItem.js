import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet,  Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../theme/colors';
import TopLabel from '../top-label';

const { width } = Dimensions.get('window');

const CarouselItem = ({ item: { title, url, uri, closeBtn } }) => {
	console.log();
	const navigation = useNavigation();
	const closeFun = () => {
		navigation.goBack();
	};
	return (
		<View style={styles.cardView}>
			<Image style={styles.image} source={uri||url}/>

			<TopLabel
				label={title}
				justifyContent={closeBtn ? 'space-between' : 'center'}
				height={'auto'}
				color='#fff'
				{...(closeBtn && {
					closeBtn,
					iconName: 'close-box',
					iconColor: colors.red,
					closeFun,
				})}
				backgroundColor={colors.TRANSPARENT_BLACK}
				customStyle={{
					position: 'absolute',
					right: 0,
					top: 0,
					padding: 10,
					width: '100%',
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	cardView: {
		width,
	},

	image: {
		width: width,
		height: '100%',
		resizeMode: 'contain',
	},
	holder: {
		//flex: 0.3,
		paddingHorizontal: 20,
	},
	text: {
		textAlign: 'center',
	},
});

export default CarouselItem;
