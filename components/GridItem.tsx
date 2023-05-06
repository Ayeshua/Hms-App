import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import ParsedText from 'react-native-parsed-text';

import { colors } from '../theme/colors';
import { Image } from 'expo-image';
import { startCase, isArray } from 'lodash';
import { screenStyles } from '../styles';
import IconHolder from './icon-holder';
import { renderText } from '../utils/renderText';
import Dot from './dot';

const GridItem = ({
	payload: {
		icon,
		url,
		profileUrl,
		name,
		adminName,
		email,
		title,
		color,
		uri,
		subTitle,
		info,
		backgroundColor = '#fff',
	},
	customStyle,
	onClickFun,
	last,
	index,
	width = '41%',
	marginTop = '6%',
	orientation = 'column',
	marginHorizontal,
	marginLeft,
	sel,
	selected,
	horizontal,
	host,
}: {
	payload: {
		icon: string;
		url: any;
		profileUrl: string;
		name: string;
		adminName: string;
		email: string;
		title: string;
		color: string;
		uri: string;
		subTitle: any;
		info: string;
		backgroundColor: string;
	};
	customStyle: any;
	onClickFun: (
		value: { index?: number; num?: number; ref?: any; title?: string },
		flag?: boolean,
	) => void;
	last: boolean;
	index: number;
	width: string | number;
	marginTop: string | number;
	orientation: string;
	marginHorizontal: string | number;
	marginLeft: string | number;
	sel: boolean;
	selected: any[];
	horizontal: boolean;
	host: number;
}) => (
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
		}}
	>
		{url||profileUrl || uri ? (
			<>
				{url && isArray(url) ? (
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: customStyle.width,
							height: customStyle.width,
							justifyContent: 'space-between',
							flexWrap: 'wrap',
						}}
					>
						{url.map(
							(
								{
									url,
									ref,
									title,
									bg,
								}: { url: string; ref: number; title: string; bg: string },
								idx: number,
							) => (
								<TouchableOpacity
									key={`${ref}`}
									onPress={() => onClickFun({ index, ref })}
									onLongPress={() => onClickFun({ index, ref }, true)}
									activeOpacity={0.7}
								>
								<Image
										style={{
											...customStyle,
											width:
												customStyle.width / 2 -
												(selected.includes(ref) ? 3 : 0),
											height:
												customStyle.width / 2 -
												(selected.includes(ref) ? 3 : 0),
											marginLeft: selected.includes(ref)
												? idx === 0 || idx === 2
													? 0
													: 3
												: 0,
											marginTop: selected.includes(ref)
												? idx === 0 || idx === 1
													? 0
													: 3
												: 0,
											borderColor: selected.includes(ref) ? bg : '#fff',
											borderWidth: 3,
											borderBottomRightRadius:
												idx === 0 ? (customStyle.width / 2) * 0.3 : 0,
											borderBottomLeftRadius:
												idx === 1 ? (customStyle.width / 2) * 0.3 : 0,
											borderTopRightRadius:
												idx === 2 ? (customStyle.width / 2) * 0.3 : 0,
											borderTopLeftRadius:
												idx === 3 ? (customStyle.width / 2) * 0.3 : 0,
										}}
										source={url||profileUrl}
										/* placeholder={blurhash}
										contentFit="cover" */
										transition={1000}
									/>
									
									<Dot
										customStyle={{
											left:
												customStyle.width / (idx === 1 || idx === 3 ? 6 : 3) -
												13.5 *
													(selected.includes(ref)
														? idx === 0 || idx === 2
															? 1.2
															: 0.8
														: 1),
											top:
												customStyle.width / (idx === 2 || idx === 3 ? 6 : 3) -
												13.5 *
													(selected.includes(ref)
														? idx === 3 || idx === 2
															? 0.8
															: 1.2
														: 1),
											position: 'absolute',
										}}
										{...{ size: 20, bg }}
										iconSize={17}
										iconColor={'#fff'}
										iconName={'plus'}
										handlePress={() => onClickFun({ title })}
									/>
								</TouchableOpacity>
							),
						)}
					</View>
				) : (
					<Image style={customStyle} 	source={url||profileUrl||uri}/>
				)}
			</>
		) : (
			<MaterialCommunityIcons
				style={{ marginTop: customStyle.width / 3 - 7 }}
				name={icon}
				color={color}
				size={(customStyle.width * 2) / 3}
			/>
		)}

		<View
			style={{
				flex: 1,
				alignItems: orientation === 'row' ? 'flex-start' : 'center',
				marginTop: '1%',
				marginHorizontal: '3%',
				marginBottom: '3%',
			}}
		>
			{(title || name) && (
				<Text
					style={{
						paddingHorizontal: 10,
						color: sel && !host ? colors.primary : '#000',
					}}
					variant={name ? 'titleMedium' : 'bodyMedium'}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{startCase(title || name)}
				</Text>
			)}
			{(email || adminName || name) && orientation === 'row' && (
				<Text
					style={{ paddingHorizontal: 10 }}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{email || startCase(adminName || name)}
				</Text>
			)}
			{info && (
				<ParsedText
					style={{...screenStyles.text,paddingHorizontal: 10}}
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
			)}
			{subTitle && (
				<View
					style={{
						width: orientation === 'row' ? '100%' : '80%',
						...screenStyles.row,
						paddingHorizontal: 10,
						alignContent: 'center',
					}}
				>
					<Text
						style={{ color: colors.silver }}
						numberOfLines={1}
						ellipsizeMode='tail'
						variant='labelSmall'
					>
						{startCase(subTitle.title)}
					</Text>
					<IconHolder
						{...{
							payload: host
								? [
									{
										...subTitle.payload[0],
										name: subTitle.payload[0].name,
										//color: sel ? colors.primary : colors.TRANSPARENT,
									},
								  ]
								: subTitle.payload,
							width: subTitle.width,
						}}
						//width={60}
						onClick={(num) => onClickFun({ index, num })}
					/>
				</View>
			)}
		</View>
	</TouchableOpacity>
);

export default memo(GridItem);
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
