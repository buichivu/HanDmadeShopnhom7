import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../themes/Colors";

var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  header: {
    position: "absolute",
    zIndex: 1,
    width: width,
  },
  cart_container: {
    height: 34,
    width: 34,
    backgroundColor: Colors.white,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  number_container: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.red,
    height: 16,
    width: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 10,
    color: Colors.white,
  },
  top_container: {
    width: width,
    height: height * 0.55,
    backgroundColor: Colors.white,
  },
  img: {
    width: width,
    height: height * 0.55,
    resizeMode: "stretch",
  },
  dot_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 25,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: Colors.white,
  },
  content: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    paddingBottom: 15,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_rating: {
    fontSize: 12,
    color: Colors.gray_text2,
    marginLeft: 5,
  },
  title: {
    fontSize: 14,
    color: Colors.gray_text2,
    marginTop: 12,
  },
  options_container: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomColor: Colors.border,
    paddingVertical: 8,
    marginTop: 20,
  },
  options: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 7,
  },
  text_options: {
    fontSize: 14,
    marginRight: 5,
  },
  add: {
    marginTop: 20,
    width: width - 32,
    backgroundColor: Colors.black,
    alignItems: "center",
    paddingVertical: 12,
  },
  add_text: {
    color: Colors.white,
    fontSize: 17,
  },
  line: {
    height: 0.5,
    width: width - 32,
    backgroundColor: Colors.border,
    marginTop: 20,
    marginBottom: 15,
  },
  action_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  action_text: {
    textTransform: "uppercase",
    fontSize: 10,
    marginTop: 5,
  },
  action_item: {
    alignItems: "center",
  },
  text_title: {
    fontSize: 13,
    color: Colors.gray_text2,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 15,
  },
  info_container: {
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.white,
  },
  info_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingRight: 16,
  },
  item: {
    paddingLeft: 16,
  },
  title_container: {
    width: width * 0.43,
  },
  row_info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  heart: {
    marginRight: 5,
  },
  title: {
    fontSize: 15,
    color: Colors.gray_text2,
  },
});
