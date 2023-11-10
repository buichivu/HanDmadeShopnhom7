import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { DELETE_ITEM, GET_CART_WITH_PAGE } from "../../../API/api";
import { formatNumberWithDot } from "../../../Utils/Utils";
import Loading from "../Loading/Loading";
import Images from "../../themes/Images";

const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [idDeleteItem, setIdDeleteItem] = useState(1);
  const [numOfCart, setNumOfCart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .delete(DELETE_ITEM + idDeleteItem)
      .then(function (response) {
        console.log("Thành công");
      })
      .catch(function (error) {
        console.log("Thất bại", error);
      });
  }, [idDeleteItem]);

  useEffect(() => {
    axios
      .get(GET_CART_WITH_PAGE, {
        params: {
          pageSize: 100,
          pageIndex: 1,
          idKeyWord: window.currentId,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        setCartData(response.data.items);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  }, [cartData]);
  useEffect(() => {
    setNumOfCart(cartData.length);
  }, [cartData.length]);
  const [sumPrice, setSumPrice] = useState(0);
  useEffect(() => {
    {
      var priceSum = cartData.reduce((previousValue, e) => {
        return previousValue + e.price * e.quantity;
      }, 0);
      setSumPrice(priceSum);
    }
  }, [cartData.length]);

  function deleteItem(id) {
    setIdDeleteItem(id);
    setIsLoading(true);
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <View style={styles.container}>
          <View style={styles.cartHeader}>
            <View style={styles.search}>
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text style={styles.cartText}>Giỏ hàng</Text>
              <View></View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {numOfCart === 0 ? (
              <View>
                <Text style={{ fontSize: 16 }}>
                  Bạn đang chưa có đơn hàng nào ở giỏ hàng
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Products")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>Xem sản phẩm</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <ScrollView>
            {cartData.map((item, i) => {
              return (
                <View style={styles.cartBox}>
                  <View style={styles.cartImg}>
                    <Image style={styles.img} source={Images.hoahong}></Image>
                  </View>
                  <View style={styles.cartDescription}>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.productDescription} numberOfLines={4}>
                      {item.productDescription}
                    </Text>
                    <Text style={styles.productPrice}>
                      {formatNumberWithDot(item.price)}
                    </Text>
                    <View style={styles.quantityBox}>
                      <View>
                        <View style={styles.totalPay}>
                          <View>
                            <Text style={styles.quantityItem}>
                              SL: {item.quantity}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.deleteCart}>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "Thông báo",
                          `Bạn có chắc muốn xóa ${item.productName} khỏi giỏ hàng?`,
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => setIdDeleteItem(item.id),
                            },
                          ]
                        )
                      }
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.goToPay}>
            <View style={styles.totalPrice}>
              <Text style={styles.totalPriceText}>Tổng:</Text>
              <Text style={styles.totalPriceText}>
                {formatNumberWithDot(sumPrice)}
              </Text>
            </View>
            {numOfCart > 0 ? (
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {
                    navigation.navigate("PayScreen", {
                      cartData,
                      sumPrice,
                    });
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
                      Kiểm tra đơn hàng
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cartBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    marginLeft: "5%",
    marginTop: 30,
    padding: 20,
    flexDirection: "row",
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
  totalPay: {
    height: "100%",
    width: "40%",
    flex: 1,
    flexDirection: "row",
  },
  quantityItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteCart: {
    justifyContent: "center",
    alignItems: "center",
  },
  goToPay: {
    borderTopColor: "#ccc",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
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
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
