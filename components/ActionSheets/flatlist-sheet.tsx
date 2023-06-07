import { memo, useRef, useState } from 'react';
import { View } from 'react-native';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Button } from 'react-native-paper';
import { reorder } from '../../utils/reorder';
import GridView from '../GridView';

const FlatListSheet = ({
	sheetId,
	payload: { 
		 profileInfo, 
		txt, 
		snapPoints,
		 btnLabel,
		host,
		isLoading,
		isSpinner,
		loadMore,
		onViewableItemsChanged,
		numColumns
	},
}) => {
	console.log('profileInfo ', profileInfo);
	const [selected, setselected] = useState<string[]>([]);
	
	const selRef = useRef([]);
	const onClickFun = ({ index }: { index: number; num?: number }) => {
		const item = profileInfo[index];
		if(host){

			const { status, userId } = item;
			if (selected.includes(userId)) {
				const idx = selected.findIndex((val) => val === userId);
				setselected(reorder(selected, idx, null, 1, true));
				selRef.current = reorder(selRef.current, idx, null, 1, true);
			} else {
				//dispatch(setSelSch(item));
				if (btnLabel) {
					setselected([...selected, userId]);
					selRef.current = [...selRef.current, { status, userId }];
				} else {
					SheetManager.hide(sheetId)
				}
			}
		}else{
			SheetManager.hide(sheetId,{
				payload:{
					item, 
					txt
				}
			})
		}
	};

	return (
		<ActionSheet
			{...{ snapPoints }}
			id={sheetId}
			containerStyle={{
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
			}}
			indicatorStyle={{
				width: 100,
			}}
			gestureEnabled
			//ref={actionSheetRef}
		>
			<GridView
				{...{
					profileInfo,
					onClickFun,
					selected,
					host,
					isLoading,
					isSpinner,
					loadMore,
					onViewableItemsChanged,
					numColumns,
					screenName:'Doctors'
				}}
			/>
			{btnLabel && (
				<View
					style={{
						display: 'flex',
						backgroundColor: '#fff',
						padding: 10,
					}}
				>
					<Button
						mode='contained'
						onPress={() => SheetManager.hide(sheetId,{
							payload:{
								refs:selRef.current, 
								txt
							}
						})}
						disabled={numColumns&&!host?false:selected.length === 0}
						textColor='#fff'
					>
						{btnLabel}
					</Button>
				</View>
			)}
		</ActionSheet>
	);
};

export default memo(FlatListSheet);
