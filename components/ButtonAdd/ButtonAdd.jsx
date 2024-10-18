import { TouchableOpacity,Text } from "react-native"
import {s} from "./ButtonAdd"

export function ButtonAdd({onPress}){
    return (
        <TouchableOpacity onPress={onPress} style={s.btn}>
            <Text style={s.txt}>+ Nouvelle Tache </Text>
        </TouchableOpacity>
    )
}