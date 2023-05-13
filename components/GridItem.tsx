import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { Text } from 'react-native-paper';
import ParsedText from 'react-native-parsed-text';

import { colors } from '../theme/colors';
import { startCase } from 'lodash';
import { screenStyles } from '../styles';
import { NestedObjToInfoString, renderText } from '../utils/renderText';
import { fbQueries } from '../constants';
import { DateTimeFormat } from '../utils/date-formatter';

const GridItem = ({
	payload,
	customStyle={},
	onClickFun,
	last,
	index,
	width = '41%',
	marginTop = '6%',
	orientation = 'column',
	marginHorizontal,
	marginLeft,
	sel,
	horizontal,
	host,
	screenName
}: {
	payload: {
		icon: string;
		
		title?: string;
		color?: string;
		profileUrl?: string;
		details?: string;
	
		size?: number;
		info?: string;
		backgroundColor?: string;
	};
	customStyle?: any;
	onClickFun: (
		value: { index?: number; num?: number; ref?: any; title?: string },
		flag?: boolean,
	) => void;
	last?: boolean;
	index?: number;
	width?: string | number;
	marginTop?: string | number;
	orientation?: string;
	screenName?: string;
	marginHorizontal?: string | number;
	marginLeft?: string | number;
	sel?: boolean;
	selected?: any[];
	horizontal?: boolean;
	host?: number;
}) => {
	const {
		icon,
		size,
		profileUrl,
		title,
		color=colors.secondary,
		info,
		backgroundColor = '#fff',
		...rest
	}=payload
	let detailStr=info
	if(screenName){
		const {name,subname,agender,body,id}=fbQueries[screenName].bind
		detailStr=NestedObjToInfoString({ 
			agender:agender==='timestamp'?`${DateTimeFormat(rest[agender])}`:rest[agender], 
			name:subname?`${rest[subname]}${rest[name]}`:rest[name], 
			body:rest[body],
			id:id?`~${rest[id]}~`:null
		})
	}
	return(
	<TouchableOpacity
		onPress={() => onClickFun({ index })}
		onLongPress={() => onClickFun({ index }, true)}
		activeOpacity={0.7}
		style={{
			...styles.container,
			width,
			marginHorizontal,
			marginLeft,
			marginTop,
			...styles.shadow,
			shadowColor: sel ? colors.cyan : '#7F5DF0',
			...screenStyles[orientation],
			marginBottom: last || horizontal ? '6%' : '0%',
			borderColor: sel && !host ? colors.primary : '#fff',
			borderWidth: 1,
			backgroundColor,
			padding:10
		}}
	>
		{profileUrl?<Image 
				 style={{width:70, height:70, borderRadius:35,marginHorizontal: 10}} 
				 source={profileUrl}
				/>
				:
				<MaterialCommunityIcons
			style={{ marginTop: '3%'}}
			name={screenName?fbQueries[screenName].iconName:icon}
			color={color}
			size={screenName?70:size||(customStyle.width * 2) / 3}
		/>}
			
		

		<View
			style={{
				flex: 1,
				alignItems: orientation === 'row' ? 'flex-start' : 'center',
				marginTop: '1%',
				marginHorizontal: '3%',
				marginBottom: '3%',
			}}
		>
			{(title ) && (
				<Text
					style={{
						paddingHorizontal: 10,
						color: sel && !host ? colors.primary : '#000',
					}}
					variant={'bodyMedium'}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{startCase(title)}
				</Text>
			)}
			
			{detailStr && (
				<ParsedText
					style={{...screenStyles.text,paddingHorizontal: 10}}
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
							pattern: /~([^,*]+)~/i,
							style: {color:colors.tertiary},
							renderText,
						},
					]}
					childrenProps={{ allowFontScaling: false }}
				>
					{detailStr}
				</ParsedText>
			)}
			
		</View>
	</TouchableOpacity>
)};

export default memo(GridItem);
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 0.75,
		borderColor: colors.coolGray,
	},
	shadow: {
		shadowOffset: {
			width: 10,
			height: 15,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.5,
		elevation: 5,
	},
});
