import { memo, useRef } from 'react';
import ListMenu from '../dialog/list-menu';
import { ScrollView } from 'react-native';

import ActionSheet, {
	useScrollHandlers,
	ActionSheetRef,
	useSheetIDContext,
	useProviderContext,
} from 'react-native-actions-sheet';
const ListMenuSheets = ({
	sheetId,
	payload: { onListClick, list, snapPoints },
}) => {
	const actionSheetRef = useRef<ActionSheetRef>(null);
	const scrollHandlers = useScrollHandlers<ScrollView>(
		'scrollview-1',
		actionSheetRef,
	);
	const contextID=useSheetIDContext()
	const providerID=useProviderContext()
	console.log('contextID ',contextID,' providerID ',providerID);
	
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
			ref={actionSheetRef}
		>
			<ScrollView {...scrollHandlers}>
				<ListMenu
					{...{ payload: list }}
					onOptClick={(idx, num) => {
						console.log('idx ', idx, ' num ', num, ' payload ', list);
						const { title } = list[num].data[idx];
						onListClick(title, idx, num);
					}}
				/>
			</ScrollView>
		</ActionSheet>
	);
};

export default memo(ListMenuSheets);
