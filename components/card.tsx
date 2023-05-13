import { memo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import { Image } from 'expo-image';
import { screenStyles } from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParsedText from 'react-native-parsed-text';
import { renderText } from '../utils/renderText';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.9;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const Card = ({ 
	info, 
	moreInfo,
	url,
	customStyle={},
	cardClick,
	iconName='account-box-outline' 
}
:
{
	info:string;
	url:string;
	iconName?:string;
	moreInfo?:string;
	customStyle?:{};
	cardClick?:(flag?:number,id?:string,col?:string)=>void;
}) => {
	console.log('moreInfo ',moreInfo,' info ',info);
	
	const handleUrlPress=(url:string)=> {
		Linking.openURL(url.includes('http')?url:`https://${url}`);
	}
	const handleInfoPress = (matchingString:string,regex:any,flag:number) => {
		const match = matchingString.match(regex);
		console.log('name ', matchingString, ' matchIndex ', match);
		cardClick(flag,match[2],match[1])
		//AlertIOS.alert(`Hello ${name}`);
	};
	return (
		<TouchableOpacity 
			disabled
			style={{
				...styles.card,
				...customStyle,
				borderRadius: 10,
				justifyContent: 'center',
				shadowOffset: {
					width: 10,
					height: 15,
				},
				shadowOpacity: 0.25,
				shadowRadius: 5.5,
				elevation: 5,
				padding:16,
			}}
		>
			
					<View
						style={{
							...screenStyles.row,
							alignSelf:'center',
							alignItems: 'center',
							justifyContent: 'flex-start',
							
						}}
					>
						<TouchableOpacity
							onPress={()=>cardClick(2)}
						>

							{url?<Image 
								style={{width:70, height:70, borderRadius:35,marginHorizontal: 10}} source={url}
								/>
								:
								<MaterialCommunityIcons
								name={iconName}
								size={50}
								color={colors.gold}
								style={{ marginHorizontal: 10 }}
							/>}
						</TouchableOpacity>
						<ParsedText
							style={{ ...screenStyles.text }}
							parse={[
								{
									pattern: /\*([^,*]+)\*/i,
									style: screenStyles.bold,
									renderText,
								},
								{
									pattern: /\<\<([^,*]+)\>\>/i,
									style: screenStyles.text10,
									renderText,
								},
								{
									pattern:  /\[([^:]+):([^\]]+)\]/i,
									style: {...screenStyles.txtBlue,...screenStyles.bold},
									renderText,
									onPress: (matchingString)=> handleInfoPress(matchingString,/\[([^:]+):([^\]]+)\]/i,1),
								},
							]}
						>
							{info}
						</ParsedText>
					</View>
				<ParsedText
							style={{ ...screenStyles.text, padding: 10 }}
							parse={[
								{
									pattern: /\*([^,*]+)\*/i,
									style: screenStyles.bold,
									renderText,
								},
								{
									pattern: /~([^,*]+)~/i,
									style: {color:colors.tertiary},
									renderText,
								},
								{
									pattern: /\<\<([^,*]+)\>\>/i,
									style: screenStyles.text10,
									renderText,
								},
								{
									type: 'url',                       
									style: screenStyles.txtBlue,
									 onPress: handleUrlPress
								},

								{
									pattern:  /\[([^:]+):([^\]]+)\]/i,
									style: {...screenStyles.txtBlue,...screenStyles.bold},
									renderText,
									onPress:(matchingString)=> handleInfoPress(matchingString,/\[([^:]+):([^\]]+)\]/i,1),
								},
								{
									pattern:  /\{\{([^:]+):([^\]]+)\}\}/i,
									style: {...screenStyles.txtBlue},
									renderText,
									onPress:(matchingString)=> handleInfoPress(matchingString,/\{\{([^:]+):([^\]]+)\}\}/i,3),
								},
							]}
						>
							{moreInfo}
						</ParsedText>
		</TouchableOpacity>
	);
};

export default memo(Card);
const styles = StyleSheet.create({
	card: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		margin:'5%',
	},
});
