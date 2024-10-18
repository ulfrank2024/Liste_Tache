import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  btn: {
    height: 25,
    width: 25,
  },
  txt: {
    fontSize: 20,
    width:300
  },
  cadre: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    height: 90,
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
