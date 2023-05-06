import { memo, useMemo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { colors } from '../theme/colors';
import { screenStyles } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParsedText from 'react-native-parsed-text';
import { renderText } from '../utils/renderText';

const { width } = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const { Indigo, blue, violet, ORANGE, red, gold } = colors;
const rainbow = [violet, Indigo, blue, ORANGE, red];

const Card = ({ 
	info, 
	url,
	whiteBg,
	customStyle,
	cardClick,
	iconClick,
	iconName='card-account-phone' 
}
:
{
	info:string;
	url:string;
	iconName?:string;
	whiteBg?:boolean;
	customStyle?:any;
	cardClick?:()=>void;
	iconClick?:()=>void
}) => {
	const colors = useMemo(() => {
		const newArr = [];
		for (let index = 0; index < rainbow.length; index++) {
			newArr.push(rainbow[Math.floor(Math.random() * 4)]);
		}
		return !whiteBg?newArr:['#fff','#fff'];
	}, [whiteBg]);
	return (
		<TouchableOpacity 
			onPress={()=>{

				if(cardClick) cardClick()
			}
			}
			style={{...styles.card,...customStyle}}
		>
			<LinearGradient
				// Background Linear Gradient
				{...{ colors }}
				start={[0.3, 0.5]}
				end={[0.5, 0.3]}
				style={{
					flex: 1,
					borderRadius: 10,
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<BlurView intensity={130}>
					<View
						style={{
							...screenStyles.row,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'flex-start',
							borderColor: '#fff',
							borderWidth: 2,
						}}
					>
						<TouchableOpacity
							onPress={()=>{

								if(iconClick) iconClick()
							}}
						>

							{url?<Image 
								style={{width:70, height:70, borderRadius:35,marginHorizontal: 10}} source={url}
								/>
								:
								<MaterialCommunityIcons
								name={iconName}
								size={50}
								color={gold}
								style={{ marginHorizontal: 10 }}
							/>}
						</TouchableOpacity>
						<ParsedText
							style={{ ...screenStyles.text, paddingRight: 10 }}
							parse={[
								{
									pattern: /\*([^,*]+)\*/i,
									style: screenStyles.bold,
									renderText,
								},
								{
									pattern: /\:([^,*]+)\:/i,
									style: screenStyles.text10,
									renderText,
								},
							]}
							childrenProps={{ allowFontScaling: false }}
						>
							{info}
						</ParsedText>
					</View>
				</BlurView>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default memo(Card);
const styles = StyleSheet.create({
	card: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
	},
});
