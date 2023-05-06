import { memo, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button, Headline, Modal, Portal } from 'react-native-paper';
import { tempTitle } from '../../constants';
import { reorder } from '../../utils/reorder';
import TableView from '../table-view';
import { screenStyles } from '../../styles';
import Slider from '@react-native-community/slider';
import { colors } from '../../theme/colors';
import Dot from '../dot';

const containerStyle = { backgroundColor: 'white' };

const ColumnWidthDialog = ({
	title,
	colWidth,
	_idx,
	onConfirm,
	onConfirmText,
	onDismissText,
	visible,
	onDismiss,
}) => {
	const [value, setvalue] = useState(colWidth[_idx]);
	const [subSelId, setsubSelId] = useState(_idx);
	const [payload, setpayload] = useState({ colWidth });
	const { width } = useWindowDimensions();
	useEffect(() => {
		const { colWidth, rows } = payload;
		console.log(' colWidth ', colWidth);
		const curColWidth = reorder(colWidth, subSelId, value);
		console.log(' curColWidth ', curColWidth);
		let rowArr = rows;
		if (!rowArr) {
			rowArr = [
				colWidth.map((value, idx) => {
					return {
						item: {
							...tempTitle,
							payload: {
								...tempTitle.payload,
								title: {
									...tempTitle.payload.title,
									outlineColor: '#fff',
									enableEdit: false,
									value,
								},
							},
						},
						_id: `${idx}`,
					};
				}),
			];
		}
		console.log(' rowArr ', rowArr);
		const load = {
			colWidth: curColWidth,
			rows: [
				reorder(rowArr[0], subSelId, {
					item: {
						...tempTitle,
						payload: {
							...tempTitle.payload,
							title: {
								...tempTitle.payload.title,
								outlineColor: '#fff',
								enableEdit: false,
								value,
							},
						},
					},
					_id: `${subSelId}`,
				}),
			],
		};
		console.log(' load ', load);
		setpayload(load);
	}, [value, subSelId]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDismiss}
				contentContainerStyle={containerStyle}
			>
				<Headline style={{ margin: 10 }}>{title}</Headline>
				{/* {message && <Paragraph>{message}</Paragraph>} */}
				<View>
					{payload.rows && (
						<TableView
							{...{ ...payload, subSelId: `${subSelId}` }}
							editFun={(pos, nest, flag, col) => {
								console.log('col ', col);
								setsubSelId(col);
								setvalue(colWidth[col]);
							}}
						/>
					)}
				</View>
				<View style={{ ...screenStyles.row, margin: 10 }}>
					<Dot
						size={22}
						bg={'white'}
						iconSize={19}
						iconColor={colors.primary}
						iconName={'minus-circle'}
						handlePress={() => setvalue(`${parseInt(value) - 1}%`)}
					/>
					<Slider
						style={{ width: width - 75, height: 30 }}
						minimumValue={1}
						maximumValue={100}
						//onValueChange={(value) => setvalue(`${value}%`)}
						onSlidingComplete={(value) => setvalue(`${value}%`)}
						step={1}
						value={parseInt(value)}
						thumbTintColor={colors.secondary}
						maximumTrackTintColor={colors.tertiary}
						minimumTrackTintColor={colors.primary}
					/>
					<Dot
						size={22}
						bg={'white'}
						iconSize={19}
						iconColor={colors.tertiary}
						iconName={'plus-circle'}
						handlePress={() => setvalue(`${parseInt(value) + 1}%`)}
					/>
				</View>
				<View style={{ ...screenStyles.row, margin: 10 }}>
					{onDismissText ? (
						<Button onPress={onDismiss}>{onDismissText || 'Cancel'}</Button>
					) : null}
					<Button onPress={() => onConfirm(payload.colWidth)}>
						{onConfirmText || 'Done'}
					</Button>
				</View>
			</Modal>
		</Portal>
	);
};

export default memo(ColumnWidthDialog);
