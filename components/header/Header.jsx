import { s } from "./Header.style";
import { Image, Text,View } from "react-native";
import headerLogo from "../../assets/ulrichImg.png";
function Header() {
  return (
      <View style={s.container}>
        <Image style={s.img} source={headerLogo} />
        <Text style={s.subtitle}> tu as problabement un truc a faire Ulrich !!! </Text>
      </View>
  );
}
export { Header };
