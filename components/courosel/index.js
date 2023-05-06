/* eslint-disable no-empty */
import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';

const { width } = Dimensions.get('window');

function infiniteScroll(dataList, flatRef) {
	const numberOfData = dataList.length;
	let scrollValue = 0;
	let scrolled = 0;
	if (flatRef === null) return;
	setInterval(() => {
		try {
			scrolled++;
			if (scrolled < numberOfData) {
				scrollValue += width;
			} else {
				scrollValue = 0;
				scrolled = 0;
			}
			flatRef.current.scrollToOffset({ animated: true, offset: scrollValue });
		} catch (error) {}
	}, 3000);
}

const Carousel = ({ data, Compo, stat, setPos, refresh, closeBtn }) => {
	console.log('pos Carousel ', refresh);
	const scrollX = useRef(new Animated.Value(0)).current;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const onViewChange = useRef(({ viewableItems }) => {
		console.log('pos viewableItems ', viewableItems);

		if (refresh !== undefined) setPos(viewableItems[0].index);
	}).current;
	const position = Animated.divide(scrollX, width);
	const [dataList, setDataList] = useState(data);
	const flatRef = useRef();
	useLayoutEffect(() => {
		setDataList(data);
		console.log('pos useEffect ', refresh);

		if (stat) {
			infiniteScroll(dataList, flatRef);
		} else {
			console.log('refresh useEffect inner', refresh);

			//flatRef.current?.scrollToIndex({ index: refresh });
		}
	}, [refresh, flatRef.current]);

	if (data && data.length) {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					ref={flatRef}
					keyExtractor={({ title }) => title}
					horizontal
					pagingEnabled
					scrollEnabled
					snapToAlignment='center'
					scrollEventThrottle={26}
					decelerationRate={'fast'}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<Compo item={{ ...item, closeBtn, resizeMode: 'contain' }} />
					)}
					onViewableItemsChanged={onViewChange}
					viewabilityConfig={viewConfig}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false },
					)}
				/>

				<View style={styles.dotView}>
					{data.map((_, i) => {
						const opacity = position.interpolate({
							inputRange: [i - 1, i, i + 1],
							outputRange: [0.3, 1, 0.3],
							extrapolate: 'clamp',
						});
						return (
							<Animated.View
								key={i}
								style={{
									opacity,
									height: 10,
									width: 10,
									backgroundColor: '#595959',
									margin: 8,
									borderRadius: 5,
								}}
							/>
						);
					})}
				</View>
			</View>
		);
	}

	console.log('Please provide Images');
	return null;
};

const styles = StyleSheet.create({
	dotView: { flexDirection: 'row', justifyContent: 'center' },
});

export default Carousel;
