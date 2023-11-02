import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import Icons from "../../themes/Icons";
import Images from "../../themes/Images";
import styles from "./styles";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../../themes/Colors";

const data = [
  {
    id: 0,
    img: Images.shoes1,
    price: 44,
    title: "Apricot Faux Leather Cap Toe Lace Up Boots",
    qlt: 2,
  },
  {
    id: 1,
    img: Images.shoes2,
    price: 41,
    title: "Black Faux Suede Cork Heel Ankle Booties",
    qlt: 1,
  },
  {
    id: 2,
    img: Images.shoes3,
    price: 48,
    title: "Black PU Round Toe Lace Up Chunky Ankle Boots",
    qlt: 1,
  },
  {
    id: 3,
    img: Images.shoes4,
    price: 44,
    title: "Apricot Faux Leather Cap Toe Lace Up Boots",
    qlt: 2,
  },
];

export default function Cart({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.Icons({ name: "back_arrow", height: 20, width: 20 })}
        title="Cart"
        shownRightItem={false}
        onPress={() => navigation.goBack()}
        showBottomLine={true}
        style={styles.header}
      />
      <SwipeListView
        disableRightSwipe={true}
        data={data}
        renderItem={({ item, rowMap }) => (
          <View style={styles.item}>
            <View style={styles.left_item}>
              <Image source={item.img} style={styles.img} />
              <View style={styles.content}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.right_item}>
              <TouchableOpacity>
                {Icons.Icons({ name: "subtract", height: 22, width: 22 })}
              </TouchableOpacity>
              <Text style={styles.number}>{item.qlt}</Text>
              <TouchableOpacity>
                {Icons.Icons({ name: "plus", height: 22, width: 22 })}
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity style={styles.rowBack}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.total}>
          <Text style={styles.text}>$177</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkout}>
          <Text style={[styles.text, { color: Colors.white }]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
