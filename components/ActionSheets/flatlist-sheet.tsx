import { memo, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import ActionSheet from 'react-native-actions-sheet';
import { Text, TextInput, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { screenStyles } from '../../styles';
import { colors } from '../../theme/colors';
//import { setSelSch } from '../../data/redux/slices/menu';
import { reorder } from '../../utils/reorder';
import GridView from '../GridView';

const FlatListSheet = ({
	sheetId,
	payload: { onListClick, profileInfo, snapPoints, title },
}) => {
	console.log('profileInfo ', profileInfo);
	const [selected, setselected] = useState<string[]>([]);
	const dispatch = useDispatch();
	const onClickFun = ({ index }: { index: number; num?: number }) => {
		const item = profileInfo[index];
		const { email } = item;
		if (selected.includes(email)) {
			const idx = selected.findIndex((val) => val === email);
			setselected(reorder(selected, idx, null, 1, true));
		} else {
			setselected([...selected, email]);
			//dispatch(setSelSch(item));
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
		>
			<Title
				style={{
					paddingLeft: 16,
				}}
			>
				{title}
			</Title>
			<GridView
				{...{
					profileInfo,
					onClickFun,
					selected,
					host: 1,
				}}
			/>
			<TouchableOpacity style={{height:50,width:'100%'}} onPress={()=>{onListClick(null, null, -1)}} >

			<Text

				style={{ ...screenStyles.input,color:colors.silver,paddingVertical:5,paddingHorizontal:16 }}
				
			>add comment...</Text>
			</TouchableOpacity>
		</ActionSheet>
	);
};

export default memo(FlatListSheet);
