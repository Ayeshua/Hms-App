import React, { memo, useRef } from 'react';
import { FlatList, View, Dimensions, ViewToken } from 'react-native';
import { screenStyles } from '../styles';
import Card from './card';
import GridItem from './GridItem';
import { Text } from 'react-native-paper';
import CalendarView from './calendar-view';
const { width } = Dimensions.get('screen');

const GridView = ({
	profileInfo,
	onClickFun,
	isLoading,
	isSpinner,
	loadMore,
	selected = [],
	numColumns,
	itemBtns,
	horizontal,
	host,
	header,
	calendarData,
	onViewableItemsChanged,
	topItem,
	screenName,
	onCalendarEvent
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
	onCalendarEvent?: (timestamp:number,flag?:boolean) => void;
	selected?: any[];
	numColumns?: number;
	itemBtns?: boolean;
	horizontal?: boolean;
	host?: number;
	header?:string;
	screenName?:string;
	calendarData?:any;
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
			keyExtractor={({ title, id, userId }) => id || userId || title}
			extraData={{ profileInfo }}
			style={{backgroundColor:'#fff'}}
			ListHeaderComponent={()=><>
				{calendarData&&<CalendarView {...{calendarData,isSpinner,onCalendarEvent}} />}
				{topItem&&<Card {...topItem} />}
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
						profileInfo.length - numColumns === index &&
						index % numColumns === 0) ||
					profileInfo.length - 1 === index
				}
				payload={{...item,size:itemBtns?22:null}}
				sel={itemBtns||selected.includes(item.ref) || selected.includes(item.userId)}
				{...{
					onClickFun,
					index,
					screenName,
					horizontal,
					orientation: horizontal || (numColumns&&!itemBtns) ? 'column' : 'row',
					width: horizontal
						? width * 0.3
						: numColumns===2
						? width * 0.41
						: numColumns===3
						? width * 0.31
						: numColumns===4
						? width * 0.23
						: width - 32,
					host,
					selected,
					disabled: host && item.status === 3,
					marginHorizontal:
						(horizontal && profileInfo.length - 1 !== index) || numColumns
							? undefined
							: 16,
					marginLeft: numColumns===2 ? '6%' :numColumns===3 ? '2%' :numColumns===4 ? '1.5%': !horizontal ? undefined : 16,
					marginTop:  numColumns===2 ? '6%' :numColumns===3 ? '2%' :numColumns===4 ? '1.5%':host ? 0 :16,
					customStyle: {
						width: horizontal
							? width * 0.3
							: numColumns===2
							? width * 0.41
							: numColumns===3
							? width * 0.31
							: numColumns===4
							? width * 0.23
								: width * 0.2,
							height: horizontal
								? width * 0.3
								: numColumns===2
							? width * 0.41
							: numColumns===3
							? width * 0.31
							: numColumns===4
							? width * 0.23
							: width * 0.2,
					},
				}}
				/>
			)}
		/>
	);
};

export default memo(GridView);
