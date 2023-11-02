import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../themes/Colors";

var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content_container: {
    marginHorizontal: 16,
  },
  options_text: {
    color: Colors.gray_text2,
    marginTop: 20,
  },
  options_container: {
    flexDirection: "row",
    marginTop: 20,
  },
  color: {
    height: 29,
    width: 29,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  bg: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  line: {
    height: 0.5,
    backgroundColor: Colors.border,
    width: width - 32,
    marginTop: 20,
  },
  text_size: {
    fontSize: 10,
  },
  price_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marker: {
    height: 29,
    width: 29,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  apply: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: Colors.black,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  apply_text: {
    color: Colors.white,
    fontSize: 17,
  },
});
