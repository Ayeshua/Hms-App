import { FC } from "react";
import { MentionSuggestionsProps } from "react-native-controlled-mentions";
import { Pressable, Text, View } from "react-native";
  
  const RenderSuggestions: FC<MentionSuggestionsProps> = ({keyword, onSuggestionPress,suggestions}) => {
    if (keyword == null) {
      return null;
    }
  
    return (
      <View style={{backgroundColor:'#fff',borderRadius:10}}>
        {suggestions
          .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
  
              style={{padding: 12}}
            >
              <Text>{one.name}</Text>
            </Pressable>
          ))
        }
      </View>
    );
  };

  export default RenderSuggestions