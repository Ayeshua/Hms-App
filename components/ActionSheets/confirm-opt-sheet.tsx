import { memo, useState } from 'react';
import { View } from 'react-native';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Button, Paragraph,  Title } from 'react-native-paper';

const TextInputSheet = ({
	sheetId,
	payload: { 
		title,
		message, 
		leftBtnLabel,
		btnLabel,
		visible
	},
}) => {
	const [loading, setLoading] = useState<any>();
	
	return (
		<ActionSheet
			id={sheetId}
			containerStyle={{
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
				padding: 16,
			}}
			closable={!loading}
			indicatorStyle={{width: 100}}
			gestureEnabled
		>
			<Title
				
			>
				{title}
			</Title>
			{message && <Paragraph>{message}</Paragraph>}



			<View
				style={{
					display: 'flex',
					paddingBottom: 16,
					marginTop:10,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				{leftBtnLabel&&<Button
				 mode='outlined' 
				 disabled={!!loading}
				 loading={loading===leftBtnLabel}

				 onPress={() => {
				
					if(visible){

						setLoading(leftBtnLabel)
						

					} else {
						SheetManager.hide(sheetId,{
							payload:leftBtnLabel
						})
					}
				}}>
					{leftBtnLabel}
				</Button>}
				<Button
					mode='contained'
					disabled={!!loading}
					loading={loading===btnLabel}

					onPress={()=>{
						if(visible){

							setLoading(leftBtnLabel)
							
	
						} else {
							SheetManager.hide(sheetId,{
								payload:btnLabel
								
							})
						}
					}}
					textColor='#fff'
				>
					{btnLabel}
				</Button>
			</View>
		</ActionSheet>
	);
};

export default memo(TextInputSheet);
