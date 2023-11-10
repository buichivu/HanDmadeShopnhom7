import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { GETPROFILEDATA, GET_ORDER_WITH_PAGE } from "../../../API/api";
import { formatNumberWithDot } from "../../../Utils/Utils";
import { UPDATE_USER, DELETE_USER } from "../../../API/api";
import Loading from "../Loading/Loading";
import Images from "../../themes/Images";

const ProfileScreen = ({ navigation, route }) => {
  const [fullname, setFullname] = useState("Bùi Chi Vu");
  const [email, setEmail] = useState("buivuisme@gmail.com");
  const [phone, setPhone] = useState("0975835652");
  const [rank, setRank] = useState("Member");
  const [userType, setUserType] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReload, setIsReLoad] = useState(false);
  useEffect(() => {
    axios
      .get(GET_ORDER_WITH_PAGE, {
        params: {
          pageSize: 100,
          pageIndex: 1,
          idKeyWord: window.currentId,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        setOrderData(response.data.items);
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  }, [orderData]);

  useEffect(() => {
    axios
      .get(GETPROFILEDATA.replace("userId", window.currentId))
      .then(function (response) {
        setIsLoading(false);
        setFullname(response.data.fullName);
        setEmail(response.data.userName);
        setName(response.data.fullName);
        setPhone(response.data.phone);
        setNewPhone(response.data.phone);
        setUserType(response.data.userType);
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  }, [isReload]);

  const [priceSetRank, setPriceSetRank] = useState(0);
  const [modalNameVisible, setModalNameVisible] = useState(false);
  const [name, setName] = useState(null);
  const [newPhone, setNewPhone] = useState(null);

  useEffect(() => {
    var tmp = 0;
    orderData.map((item) => {
      if (item.status == "Đã giao") {
        tmp = tmp + item.price;
      }
    });
    setPriceSetRank(tmp);
  }, [orderData.length]);

  function cancelName() {
    setName(fullname);
    setNewPhone(phone);
    setModalNameVisible(!modalNameVisible);
  }

  const regexPhoneNumber = (phone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return phone.match(regexPhoneNumber) ? true : false;
  };

  function updateUser() {
    console.log("name: ", name);
    console.log("newPhone: ", newPhone);
    axios({
      url: UPDATE_USER,
      method: "PUT",
      data: {
        id: window.currentId,
        fullname: name,
        phone: newPhone,
      },
    })
      .then((result) => {
        Alert.alert("Thông báo", "Thay đổi thành công");
        setIsReLoad(!isReload);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Thông báo", err.response.data);
      });
  }

  function checkUpdateUser() {
    var isPass = true;
    if (name.length < 8) {
      Alert.alert("Thông báo", "Họ và tên tối thiểu 8 ký tự");
      setName(fullname);
      setNewPhone(phone);
      isPass = false;
    }
    if (!regexPhoneNumber(newPhone)) {
      Alert.alert("Thông báo", "Số điện thoại không hợp lệ");
      setName(fullname);
      setNewPhone(phone);
      isPass = false;
    }
    setModalNameVisible(false);
    setIsLoading(true);
    if (isPass) {
      updateUser();
    }
  }

  function deleteUser() {
    console.log("!!! UserID: ", window.currentId);
    axios
      .delete(DELETE_USER + window.currentId)
      .then((result) => {
        console.log("bạn đã xóa thành công");
        navigation.navigate("SignIn");
      })
      .catch((err) => {
        console.log("Thông báo", err.response.data);
      });
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNameVisible}
        onRequestClose={() => {
          setModalNameVisible(!modalNameVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "red",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", padding: 8 }}>
                Sửa Thông Tin Khách Hàng
              </Text>
            </View>
            <View style={{ marginVertical: 20, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text style={{ width: "30%", paddingTop: 16 }}>Họ tên: </Text>
                  <TextInput
                    style={{
                      flex: 1,
                      textAlignVertical: "top",
                      marginTop: 8,
                      paddingTop: 8,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 20,
                      paddingHorizontal: 12,
                    }}
                    placeholder="Nhập họ và tên"
                    defaultValue={name}
                    onChangeText={(newText) => setName(newText)}
                  ></TextInput>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ width: "30%", paddingTop: 16 }}>
                    Số điện thoại:{" "}
                  </Text>
                  <TextInput
                    style={{
                      flex: 1,
                      textAlignVertical: "top",
                      marginTop: 8,
                      paddingTop: 8,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 20,
                      paddingHorizontal: 12,
                    }}
                    placeholder="Nhập số điện thoại"
                    defaultValue={newPhone}
                    onChangeText={(newText) => setNewPhone(newText)}
                  ></TextInput>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  bottom: 0,
                  flexDirection: "row-reverse",
                  alignContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => checkUpdateUser()}
                >
                  <Text style={styles.textStyle}>Xác Nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonExist,
                    { marginRight: 12, width: 80 },
                  ]}
                  onPress={() => cancelName()}
                >
                  <Text style={styles.textStyle}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <View style={styles.container}>
          <View style={styles.cartHeader}>
            <View style={styles.search}>
              <Text style={styles.profileText}>TRANG CÁ NHÂN</Text>
            </View>
          </View>
          <Text
            style={[styles.headerText, { alignSelf: "center", marginTop: 20 }]}
          >
            TÀI KHOẢN
          </Text>
          <ScrollView style={{ paddingLeft: 30 }}>
            <View style={styles.headerPart}>
              <Text style={styles.headerText}>CHÀO BẠN!</Text>
            </View>
            <View style={styles.accountInfo}>
              <View>
                <Text style={styles.title}>THÔNG TIN TÀI KHOẢN</Text>
                <View style={{ padding: 10 }}>
                  <Text style={styles.text}>Họ tên: {fullname}</Text>
                  <Text style={styles.text}>Email: {email}</Text>
                  <Text style={styles.text}>
                    Số điện thoại: {phone != "" ? phone : "Chưa thiết lập"}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity
                      style={[
                        styles.changePass,
                        {
                          backgroundColor: "#01ab9d",
                          padding: 8,
                          borderRadius: 12,
                          width: "45%",
                        },
                      ]}
                      onPress={() => navigation.navigate("ChangePassword")}
                    >
                      <Text
                        style={[
                          styles.changePassText,
                          { color: "#fff", textAlign: "center" },
                        ]}
                      >
                        Đổi mật khẩu
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.changePass,
                        {
                          backgroundColor: "#01ab9d",
                          padding: 8,
                          borderRadius: 12,
                          marginLeft: 20,
                          width: "45%",
                        },
                      ]}
                      onPress={() => setModalNameVisible(true)}
                    >
                      <Text
                        style={[
                          styles.changePassText,
                          { color: "#fff", textAlign: "center" },
                        ]}
                      >
                        Đổi thông tin
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Text style={styles.title}>LỊCH SỬ ĐẶT HÀNG</Text>
              {orderData.map((item, key) => {
                return (
                  <View style={styles.historyOrder}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={styles.historyImage}
                        source={Images.hoahong}
                      ></Image>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={styles.historyText}>
                          {item.productName} | Số lượng: {item.quantity}
                        </Text>
                        <Text style={styles.historyText}>
                          Thành tiền: {formatNumberWithDot(item.price)}
                        </Text>
                        <Text style={styles.historyText}>
                          Tình trạng: {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Thông báo",
                "Bạn có chắc chắn muốn xóa tài khoản này ?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => deleteUser() },
                ]
              )
            }
          >
            <View style={styles.button}>
              <View style={styles.signIn}>
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
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
                    Xóa Tài Khoản
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <View style={styles.button}>
              <View style={styles.signIn}>
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
                    Đăng xuất
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartHeader: {
    backgroundColor: "#FFCC33",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    marginTop: 30,
  },
  profileText: {
    fontSize: 20,
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  headerPart: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  historyOrder: { padding: 10 },
  historyImage: {
    width: 100,
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  historyText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
  changePass: {},
  changePassText: {
    color: "#48B600",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    width: "90%",
    height: "50%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonExist: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "#48B600",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProfileScreen;
