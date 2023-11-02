import { StyleSheet } from "react-native";
import Colors from "../../themes/Colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  right_item: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    justifyContent: "space-between",
  },
  cart: {},
  left_item: {
    width: 70,
  },
  title: {
    fontSize: 17,
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.border,
    width: "100%",
    marginTop: 10,
  },
});
