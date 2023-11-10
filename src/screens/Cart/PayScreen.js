import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { CREATE_ORDER, DELETE_ALL_ITEM } from "../../../API/api";
import { formatNumberWithDot } from "../../../Utils/Utils";
import Images from "../../themes/Images";

const PayScreen = ({ route, navigation }) => {
  const order = () => {
    cartData.map((product) => {
      axios({
        url: CREATE_ORDER,
        method: "POST",
        data: {
          customerId: window.currentId,
          customerName: customerName,
          phoneNumber: phoneNumber,
          address: address,
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
          delivery: "null",
          deliveryPrice: checkDeliPrice,
          discount: discountText,
          discountPrice: discount,
          finalPrice: totalPriceFinal,
          productImage: product.productImage,
          status: "Chờ xác nhận",
        },
      })
        .then((result) => {
          console.log("Thành công");
        })
        .catch((err) => {
          console.log("Thất bại", err.response);
        });
    });
    axios
      .delete(DELETE_ALL_ITEM.replace("userId", window.currentId))
      .then(function (response) {
        console.log("Thành công");
      })
      .catch(function (error) {
        console.log("Thất bại", error);
      });
    navigation.navigate("Profile");
  };
  const { cartData, sumPrice } = route.params;
  const [checkDeliPrice, setCheckDeliPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(sumPrice);
  const [discount, setDiscount] = useState(0);
  const [totalPriceFinal, setTotalPriceFinal] = useState(
    totalPrice + checkDeliPrice - discount
  );
  const [discountText, setDiscountText] = useState("");
  const [bcN, setBcN] = useState("");
  const [bcF, setBcF] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    setTotalPriceFinal(totalPrice + checkDeliPrice - discount);
  }, [discount, checkDeliPrice]);
  const handleDiscount = () => {
    if (discountText != "") {
      if (discountText == "ABCXYZ") {
        setDiscount(10000);
      } else {
        setDiscount(0);
        Alert.alert("Mã gảm giá không đúng hoặc đã hết hạn sử dụng");
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <View style={styles.search}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={styles.cartText}>Thanh toán</Text>
          <Text></Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.payContent}>
          <Text style={styles.infoHeader}>THÔNG TIN KHÁCH HÀNG</Text>
          <View style={styles.address}>
            <Text style={styles.label}>Họ và tên người nhận *</Text>
            <TextInput
              value={customerName}
              onChangeText={(value) => {
                setCustomerName(value);
              }}
              style={styles.searchInput}
              placeholder="Họ và tên người nhận..."
            ></TextInput>
            <Text style={styles.label}>Số điện thoại *</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(value) => {
                setPhoneNumber(value);
              }}
              style={styles.searchInput}
              placeholder="Số điện thoại..."
            ></TextInput>
            <Text style={styles.label}>Địa chỉ giao hàng *</Text>
            <TextInput
              value={address}
              onChangeText={(value) => {
                setAddress(value);
              }}
              style={styles.searchInput}
              placeholder="Địa chỉ giao hàng..."
            ></TextInput>
          </View>
          <Text style={styles.infoHeader}>THÔNG TIN SẢN PHẨM</Text>
          {cartData.map((product) => {
            return (
              <View style={styles.productPart}>
                <View style={styles.cartImg}>
                  <Image style={styles.img} source={Images.hoahong}></Image>
                </View>
                <View style={styles.cartDescription}>
                  <Text style={styles.productName}>{product.productName}</Text>
                  <Text>Số lượng: {product.quantity}</Text>
                  <Text style={styles.productDescription}>
                    {product.productDescription}
                  </Text>
                  <Text style={styles.productPrice}>
                    {formatNumberWithDot(product.price)}
                  </Text>
                </View>
              </View>
            );
          })}
          <Text style={styles.infoHeader}>PHƯƠNG THỨC VẬN CHUYỂN</Text>
          <View style={styles.delivery}>
            <TouchableOpacity
              onPress={() => {
                setCheckDeliPrice(0), setBcN("black") + setBcF("#fff");
              }}
              style={{ marginBottom: 10 }}
            >
              <View style={styles.checkDelivery}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    backgroundColor: bcN,
                    borderRadius: 10,
                    borderColor: bcN,
                  }}
                ></View>
                <Text style={{ marginLeft: 40 }}>Vận chuyển thường</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCheckDeliPrice(0), setBcF("black"), setBcN("#fff");
              }}
            >
              <View style={styles.checkDelivery}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    backgroundColor: bcF,
                    borderRadius: 10,
                    borderColor: bcF,
                  }}
                ></View>
                <Text style={{ marginLeft: 40 }}>Vận chuyển phát nhanh</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoHeader}>MÃ GIẢM GIÁ</Text>

          <View style={styles.discount}>
            <Text style={styles.label}>Mã giảm giá</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                onChangeText={(newText) => setDiscountText(newText)}
                style={styles.discountInput}
                placeholder="Nhập mã giảm giá..."
              ></TextInput>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={handleDiscount}
                  style={styles.signIn}
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
                      Sử dụng
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.infoHeader}>TỔNG TIỀN</Text>
          <View style={styles.total}>
            <View style={styles.row}>
              <Text style={styles.row1}>Tổng tiền</Text>
              <Text style={styles.row2}>{formatNumberWithDot(totalPrice)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.row1}>Vận chuyển</Text>
              <Text style={styles.row2}>
                {formatNumberWithDot(checkDeliPrice)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.row1}>Giảm giá</Text>
              <Text style={styles.row2}>{formatNumberWithDot(discount)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalPay}>
          <Text style={{ fontWeight: "500" }}>Tổng thanh toán</Text>
          <Text style={{ color: "red" }}>
            {formatNumberWithDot(totalPriceFinal)}
          </Text>
        </View>
        <TouchableOpacity style={styles.confirm} onPress={order}>
          <Text style={{ fontWeight: "500", fontSize: 30, color: "black" }}>
            Đặt hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  payContent: {
    padding: 20,
  },
  cartHeader: {
    backgroundColor: "#FFCC33",
    height: 100,
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around",
  },
  cartText: {
    fontSize: 30,
    color: "black",
    fontWeight: "500",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  discountInput: {
    backgroundColor: "#fff",
    width: "70%",
    padding: 10,
    borderRadius: 5,
  },
  infoHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  address: {
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#8A1415",
  },

  productPart: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 30,
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  cartImg: {
    width: "40%",
  },
  img: {
    width: 100,
    height: 100,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cartDescription: {
    width: "55%",
  },
  productPrice: {
    marginTop: 10,
    color: "red",
  },
  productDescription: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
  discount: {
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  row1: {
    flex: 1,
    fontSize: 16,
    opacity: 0.6,
  },
  row2: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  total: {
    padding: 10,
  },
  delivery: {
    padding: 10,
    marginBottom: 10,
  },
  checkDelivery: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    height: 63,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalPay: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    flex: 1,
  },
  confirm: {
    backgroundColor: "#FFCC33",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    flex: 1,
  },
});
