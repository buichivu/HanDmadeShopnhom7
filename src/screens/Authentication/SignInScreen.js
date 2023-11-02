import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LOGIN } from "../../../API/api";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Images from "../../themes/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
var { height, width } = Dimensions.get("window");
const dataimg = [{}, {}, {}];
const SignInScreen = ({ navigation }) => {
  const [isSecurity, setIsSecurity] = useState(true);
  const [username, setUsername] = useState("nguyennamkhanh");
  const [password, setPassword] = useState("namkhanh12334");
  const [selected, setSelected] = useState(0);

  const validateLogin = async (username, password) => {
    if (username == "" || password == "") {
      Alert.alert("Thông báo", "Thông tin đăng nhập phải nhập đầy đủ!");
    } else {
      try {
        const response = await axios.post(LOGIN, {
          userName: username,
          password: password,
        });
        //await AsyncStorage.setItem("Token", response.data.token);
        navigation.navigate("Main");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Carousel
          loop
          width={width}
          height={height * 0.3}
          data={dataimg}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setSelected(index)}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.item}>
              <Image source={Images.img_signup} style={styles.img} />
            </View>
          )}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.text_header}>Đăng Nhập</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer]}>Tài Khoản</Text>
        <View style={styles.action}>
          <TextInput
            value={username}
            onChangeText={(value) => {
              setUsername(value);
            }}
            placeholder="Tài Khoản"
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
        </View>
        <Text style={[styles.text_footer, { marginTop: 30 }]}>Mật khẩu</Text>
        <View style={styles.action}>
          <TextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder="Mật khẩu"
            secureTextEntry={isSecurity}
            style={styles.textInput}
            autoCapitalize="none"
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setIsSecurity((prev) => !prev);
            }}
          >
            <AntDesign name="eyeo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              validateLogin(username, password);
            }}
          >
            <LinearGradient
              colors={["#ffcccc", "#ff00ff"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Đăng nhập
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCC33",
    flex: 1,
  },
  header: {
    flex: 0.5,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  img: {
    width: width,
    height: 500,
  },
  dot_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignInScreen;
