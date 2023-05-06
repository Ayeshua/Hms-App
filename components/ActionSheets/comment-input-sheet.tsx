import { memo, useEffect, useRef, useState } from 'react';
import { View,Dimensions, TextInput } from 'react-native';

import ActionSheet from 'react-native-actions-sheet';
import { MentionInput, MentionSuggestionsProps } from 'react-native-controlled-mentions'
import { MentionData } from 'react-native-controlled-mentions/dist/types';
import { infoTags } from '../../constants/temp-data';
  import { screenStyles } from '../../styles';
import { colors } from '../../theme/colors';
import Dot from '../dot';
import RenderSuggestions from '../suggestions';

const {width}=Dimensions.get('screen')

const suggestions = [
    {id: '1', name: 'David Tabaka'},
    {id: '2', name: 'Mary'},
    {id: '3', name: 'Tony'},
    {id: '4', name: 'Mike'},
    {id: '5', name: 'Grey'},
  ];
const CommentInputSheet = ({
	sheetId,
	payload: { onSend, txt,mountFocus,placeholder,closable,backgroundInteractionEnabled,from,mentionMode},
}) => {
	console.log('CommentInputSheet ',from);

	const ref=useRef<TextInput>()
	const [article, setArticle] = useState(txt);	
	useEffect(() => {
		console.log('start ');
		
		if(mountFocus){
			setInterval( ()=> {
				//element.innerHTML += "Hello"
				ref.current?.focus()
			}, 1000);
		}
	}, [mountFocus])
	
	return (
		<ActionSheet
			id={sheetId}
			containerStyle={{
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
				backgroundColor:colors.TRANSPARENT,
			}}
			{...{closable,backgroundInteractionEnabled}}
			gestureEnabled
		>
			<View style={{...screenStyles.row, alignItems:'flex-end',paddingHorizontal: 16}}>

				<MentionInput
					value={article}
					onChange={(value)=>{
						console.log('value ',value);
						
						setArticle(value)
					}}
					{...{placeholder}}
					inputRef={ref}
					style={{backgroundColor:'#fff',width:width-(article?82:32),padding:10,marginBottom:backgroundInteractionEnabled?97:20,borderRadius:10}}
					{...(mentionMode&&{partTypes:[
						{
						trigger: '@', 
						renderSuggestions:(props: MentionSuggestionsProps) =><RenderSuggestions {...{...props,suggestions}} />,
						textStyle: {fontWeight: 'bold', color: 'blue'}, 
						},
						{
						trigger: '#', 
						renderSuggestions:(props: MentionSuggestionsProps) =><RenderSuggestions {...{...props,suggestions}} />,
						textStyle: {fontWeight: 'bold', color: 'blue'}, 
						},
						{
						trigger: '¿', 
						renderSuggestions:(props: MentionSuggestionsProps) =><RenderSuggestions {...{...props,suggestions:infoTags}} />,
						textStyle: {fontWeight: 'bold', color: 'blue'}, 
						getPlainString:(mention:MentionData)=>{
							console.log('mention ',mention);
							
							return `info@${mention.name}`
						}
						},
					]})}
				/>
				{article&&<Dot
										
					{...{ size: 50, bg:'#fff' }}
					iconSize={47}
					iconColor={colors.primary}
					iconName={'send-circle'}
					customStyle={{marginBottom:backgroundInteractionEnabled?97:16}}
					handlePress={() => onSend(article)}
				/>}

			</View>
		</ActionSheet>
	);
};

export default memo(CommentInputSheet);
