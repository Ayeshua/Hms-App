import React, { memo, useRef } from 'react';
import { FlatList, View, Dimensions, ViewToken } from 'react-native';
import { screenStyles } from '../styles';
import Card from './card';
import GridItem from './GridItem';
import { Text } from 'react-native-paper';
const { width } = Dimensions.get('screen');

const GridView = ({
	profileInfo,
	onClickFun,
	isLoading,
	isSpinner,
	loadMore,
	selected = [],
	numColumns,
	resizeMode = 'cover',
	horizontal,
	host,
	header,
	onViewableItemsChanged,
	topItem
}: {
	profileInfo: any[];
	onClickFun: (res: { index: number; num: number }) => void;
	onViewableItemsChanged?: (info: {
		viewableItems: ViewToken[];
		changed: ViewToken[];
	}) => void;
	isLoading?: boolean;
	isSpinner?: boolean;
	loadMore?: () => void;
	selected?: any[];
	numColumns?: number;
	resizeMode?: string;
	horizontal?: boolean;
	host?: number;
	header?:string;
	topItem?: { info: string; url: string; whiteBg?: boolean; } 
}) => {
	const handleItemsPartiallyVisible = (info: {
		viewableItems: ViewToken[];
		changed: ViewToken[];
	}) => {
		if (onViewableItemsChanged) {
			onViewableItemsChanged(info);
		}
	};

	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: {
				minimumViewTime: 150,
				itemVisiblePercentThreshold: 10,
			},
			onViewableItemsChanged: handleItemsPartiallyVisible,
		},
	]);

	const handleMore = () => {
		if (!isLoading && loadMore) {
			loadMore();
		}
	};

	return (
		<FlatList
			data={profileInfo}
			keyExtractor={({ title, _id, userId }) => _id || userId || title}
			extraData={{ profileInfo }}
			style={{backgroundColor:'#fff'}}
			ListHeaderComponent={()=><>
				{topItem&&<Card {...{...topItem}} />}
				{header&&    <Text style={{marginVertical:5,marginHorizontal:16}} variant="titleLarge">{header}</Text>
}
			</>
			}
			ListEmptyComponent={() => (
				<View style={screenStyles.center}>
					<Text>{isSpinner ? 'Loading...' : 'No Data Yet'}</Text>
				</View>
			)}
			onEndReachedThreshold={0.5}
			onEndReached={handleMore}
			{...(horizontal && { showsHorizontalScrollIndicator: false, horizontal })}
			{...(numColumns && { numColumns })}
			viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
			renderItem={({ item, index }) => (
				<GridItem
					last={
						(numColumns &&
							profileInfo.length - 2 === index &&
							index % 2 === 0) ||
						profileInfo.length - 1 === index
					}
					payload={item}
					sel={selected.includes(item.ref) || selected.includes(item.userId)}
					{...{
						onClickFun,
						index,
						horizontal,
						orientation: horizontal || numColumns ? 'column' : 'row',
						width: horizontal
							? width * 0.3
							: numColumns
							? width * 0.41
							: host
							? width
							: width - 32,
						host,
						selected,
						marginHorizontal:
							(horizontal && profileInfo.length - 1 !== index) ||
							host ||
							numColumns
								? undefined
								: 16,
						marginLeft: numColumns ? '6%' : !horizontal ? undefined : 16,
						marginTop: host ? 0 : numColumns ? '6%' : 16,
						customStyle: {
							width: horizontal
								? width * 0.3
								: numColumns
								? width * 0.41
								: host
								? 30
								: width * 0.2,
							height: horizontal
								? width * 0.3
								: numColumns
								? width * 0.41
								: host
								? 30
								: width * 0.2,
							contentFit:resizeMode,
							marginLeft: host ? 16 : 0,
							borderRadius: item.mode
								? (horizontal
										? width * 0.3
										: numColumns
										? width * 0.41
										: host
										? 30
										: width * 0.2) / 2
								: 0,
						},
					}}
				/>
			)}
		/>
	);
};

export default memo(GridView);
