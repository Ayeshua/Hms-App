import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Card, IconButton, Text } from 'react-native-paper';
import { colors } from '../theme/colors';
import { startCase } from 'lodash';
import { screenStyles } from '../styles';
import { renderText, subText } from '../utils/renderText';
import IconHolder from './icon-holder';
import { formatDistance } from 'date-fns';
import { cats, subTitleIcons } from '../constants/temp-data';
import ParsedText from 'react-native-parsed-text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelCat } from '../data/redux/slices/menu';

const ListItem = ({
	payload: {
		createdAt,
		url,
		profileUrl,
		username,
		userId: uid,
		status,
		adminComment,
		info,
		title,
		start,
		end,
		type,
		views,
		likes,
		comments,
	},
	customStyle,
	full,
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
}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();
	const {
		user: { super_admin, moderator, userId },
	} = useSelector((state) => state.login);
	const handleInfoPress = (matchingString) => {
		const match = matchingString.match(/\[(info@[^:]+):([^\]]+)\]/i);
		console.log('name ', matchingString, ' matchIndex ', match[2]);
		navigation.navigate('MoreInfo', { _id: match[2] });
		//AlertIOS.alert(`Hello ${name}`);
	};
	const handleCatPress = (matchingString) => {
		const match = matchingString.match(/\<([^,*]+)\>/i);
		console.log('name ', matchingString, ' matchIndex ', match);
		const { ref } = cats.find(({ title }) => title === match[1]);
		dispatch(setSelCat([ref]));
		const { name } = route;
		if (name === 'Post') {
			navigation.goBack();
		}
		//navigation.navigate('MoreInfo', { _id: match[2] });
		//AlertIOS.alert(`Hello ${name}`);
	};
	return (
		<View
			style={{
				...styles.container,
				width,
				marginTop,
				marginHorizontal,
				marginLeft,
				...styles.shadow,
				shadowColor: sel ? colors.cyan : '#7F5DF0',
				...screenStyles[orientation],
				marginBottom: last || horizontal ? '6%' : '0%',
				borderColor: sel ? colors.secondary : '#fff',
				borderWidth: 1,
				backgroundColor: status ? '#fff' : 'grey',
			}}
		>
			<Card.Title
				title={startCase(username)}
				subtitle={`${formatDistance(
					new Date(createdAt),
					new Date(),
				)} | ${views} views`}
				subtitleStyle={{ color: colors.silver }}
				left={() => (
					<Image
						style={{ width: 50, height: 50, borderRadius: 25 }}
						source={profileUrl}
					/>
				)}
				{...((userId === uid || super_admin || moderator) && {
					right: (props) => (
						<IconButton
							{...props}
							icon='dots-vertical'
							onPress={() => onClickFun({ index, num: 15 })}
						/>
					),
				})}
			/>
			{adminComment && (
				<Text variant='bodySmall' style={{ color: 'red' }}>
					{adminComment}
				</Text>
			)}
			<TouchableOpacity
				onPress={() => onClickFun({ index })}
				disabled={full}
				activeOpacity={0.7}
				//onLongPress={() => onClickFun({ index }, true)}
			>
				<Image style={customStyle} 	source={url}/>
			</TouchableOpacity>
			<IconHolder
				{...{ payload: subTitleIcons, width: '100%', padding: 10 }}
				//width={60}
				onClick={(num) => onClickFun({ index, num })}
			/>
			<View
				style={{
					width: '100%',
					marginBottom: '5%',
					paddingHorizontal: 13,
				}}
			>
				<View style={screenStyles.row}>
					<Text variant='titleSmall'>{`${likes}`}</Text>
					<Text variant='titleSmall'>{`${comments}`}</Text>
				</View>
				<ParsedText
					style={{ ...screenStyles.text }}
					parse={[
						{
							pattern: /\*([^,*]+)\*/i,
							style: screenStyles.bold,
							renderText,
						},
						{
							pattern: /\<([^,*]+)\>/i,
							style: screenStyles.txtGray,
							renderText: (matchingString, matches) =>
								renderText(matchingString, matches, 1, '#'),
							onPress: handleCatPress,
						},
						{
							pattern: /\^([^,*]+)\^/i,
							style: screenStyles.txtGreen,
							renderText: (matchingString, matches) =>
								renderText(matchingString, matches, 1, ''),
						},
						{
							pattern: /\`([^,*]+)\`/i,

							style: screenStyles.txtOrange,
							renderText,
						},
						{
							pattern: /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/i,
							style: screenStyles.txtBlue,
							renderText: (matchingString, matches) =>
								renderText(matchingString, matches, 0),
						},
						{
							pattern: /\[(@[^:]+):([^\]]+)\]/i,
							style: screenStyles.txtBlue,
							renderText,
						},
						{
							pattern: /\[(info@[^:]+):([^\]]+)\]/i,
							style: screenStyles.txtBlue,
							renderText,
							onPress: handleInfoPress,
						},
					]}
					childrenProps={{ allowFontScaling: false }}
				>
					{`*${title}*
<${type}> ${start ? '^' + start + '^' : ''} ${end ? '`' + end + '`' : ''}
${info.length > 88 && !full ? `${subText(info)}...` : info}`}
				</ParsedText>
			</View>
		</View>
	);
};

export default memo(ListItem);
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',

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
