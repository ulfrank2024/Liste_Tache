import { TouchableOpacity, Text, Image } from "react-native";
import checkimg from "../../assets/check.png";
import { s } from "./Carteliste.style";
export function Carteliste({ liste, onPress, onLonPress }) {
  return (
    <TouchableOpacity
      onLongPress={() => onLonPress(liste)}
      onPress={() => onPress(liste)}
      style={s.cadre}
    >
      <Text
        style={[
          s.txt,
          liste.isCompled && { textDecorationLine: "line-through" },
        ]}
      >
        {liste.title}
      </Text>
      {liste.isCompled && <Image source={checkimg} style={s.btn} />}
    </TouchableOpacity>
  );
}
