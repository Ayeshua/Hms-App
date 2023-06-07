import { memo } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { screenStyles } from '../styles';
import Combo from './combo';
import TableView from './table-view';

const DisplayElements = ({ matrix, selElement, elementSelector, inflater }) => (
	<>
		{matrix ? (
			<FlatList
				//style={{ paddingHorizontal: 10 }}
				data={matrix}
				keyExtractor={({ _id }) => _id}
				extraData={{ matrix }}
				snapToAlignment='center'
				ListEmptyComponent={() => (
					<View style={screenStyles.center}>
						<Text>Add Elements</Text>
					</View>
				)}
				renderItem={({ item, index }) => (
					<>
						{item.item.payload.type ? (
							<TableView
								{...{ ...item.item.payload, inflater }}
								last={matrix.length - 1 === index}
								sel={selElement?.idx === index}
								subSelId={selElement?.subSel?._id}
								editFun={(pos, nest, flag, col, row) =>
									elementSelector(item, pos, nest, index, flag, col, row)
								}
							/>
						) : (
							<Combo
								last={matrix.length - 1 === index}
								sel={selElement?.idx === index}
								{...{ ...item, inflater }}
								editFun={(pos, nest) => elementSelector(item, pos, nest, index)}
							/>
						)}
					</>
				)}
			/>
		) : null}
	</>
);

export default memo(DisplayElements);
