import { TouchableOpacity, View, Text} from "react-native";
import { s } from "./TabBottunMenu";


export function TabBottunMenu({selectedTabName, onPress, tacheList}) {
  const countBystatus =tacheList.reduce(
    (acc, liste) =>{
      liste.isCompled ? acc.fait++ : acc.enCour++
      return acc
    },
      { tous: tacheList.length, enCour: 0, fait: 0}
  )
    function getTextStyle(tabName){
        return {
            fontWeight:"blod",
            color: tabName === selectedTabName? "#FFDEAD": "white"
        }
    }
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={()=> onPress("tous")}>
        <Text style={getTextStyle("tous")}>Tous ({countBystatus.tous})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPress("enCour")}>
        <Text  style={getTextStyle("enCour")}>en Cour ({countBystatus.enCour}) </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPress("fait")}>
        <Text  style={getTextStyle("fait")}>fini ({countBystatus.fait}) </Text>
      </TouchableOpacity>
    </View>
  );
}
