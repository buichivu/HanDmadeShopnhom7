import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../themes/Colors";

var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    height: 120,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: Colors.red,
    marginHorizontal: 16,
    marginTop: 16,
    paddingRight: 16,
  },
  delete: {
    color: Colors.white,
  },
  item: {
    flexDirection: "row",
    width: width - 32,
    marginTop: 16,
    padding: 7,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
  },
  img: {
    height: 113,
    width: 88,
  },
  content: {
    marginLeft: 10,
    width: 0.75 * width - 100,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 15,
    color: Colors.gray_text2,
    marginTop: 12,
  },
  left_item: {
    flexDirection: "row",
    width: width * 0.75,
  },
  right_item: {
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    marginVertical: 10,
    fontSize: 13,
  },
  bottom: {},
  total: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkout: {
    backgroundColor: Colors.black,
    paddingVertical: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
});
