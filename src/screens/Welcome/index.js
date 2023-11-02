import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Images from "../../themes/Images";

const WelcomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("SignIn")}
    >
      <ImageBackground
        source={Images.img_categories}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default WelcomeScreen;
