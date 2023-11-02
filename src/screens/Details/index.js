import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../../components/Header";
import Icons from "../../themes/Icons";
import Carousel from "react-native-reanimated-carousel";
import styles from "./styles";
import Images from "../../themes/Images";
import Colors from "../../themes/Colors";

var { height, width } = Dimensions.get("window");
const data = [{}, {}, {}];

const listData = [
  {
    id: 0,
    img: Images.shoes1,
    price: 38,
    title: "Black Lace Up Rubber Sole Low Top Sneakers",
    status: 0,
  },
  {
    id: 1,
    img: Images.shoes2,
    price: 37,
    title: "Apricot Faux Suede Lace Up Rubber Sole Low",
    status: 1,
  },
  {
    id: 2,
    img: Images.shoes3,
    price: 35,
    title: "Pink Satin Fabric Rubber Sole Low Top Sneakers",
    status: 0,
  },
  {
    id: 3,
    img: Images.shoes4,
    price: 39,
    title: "Pink Velvet Lace Up Rubber Sole Sneakers",
    status: 0,
  },
];

export default function Details({ navigation }) {
  const [selected, setSelected] = useState(0);

  const rightContent = () => {
    return (
      <TouchableOpacity
        style={styles.cart_container}
        onPress={() => navigation.navigate("Cart")}
      >
        {Icons.Icons({ name: "cart", height: 24, width: 21 })}
        <View style={styles.number_container}>
          <Text style={styles.number}>3</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRating = (rating = 5) => {
    let arr = [...new Array(rating).keys()];
    let arrSilver = [...new Array(5 - rating).keys()];
    return (
      <View style={styles.rating_container}>
        {arr.map((item, index) => {
          return (
            <View key={index}>
              {Icons.Icons({ name: "star", height: 10, width: 10 })}
            </View>
          );
        })}
        {arrSilver.map((item, index) => {
          return (
            <View key={index}>
              {Icons.Icons({ name: "star_silver", height: 10, width: 10 })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.top_container}>
        <Header
          leftIcon={Icons.Icons({ name: "back_arrow", height: 20, width: 20 })}
          shownTitle={false}
          onPress={() => navigation.goBack()}
          style={styles.header}
          right_content={rightContent()}
        />
        <Carousel
          loop
          width={width}
          data={data}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setSelected(index)}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Image source={Images.slider_details} style={styles.img} />
            </View>
          )}
        />
        <View style={styles.dot_container}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: selected === index ? 1 : 0.4,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.price}>$46.00</Text>
          <View style={styles.rating_container}>
            {renderRating(4)}
            <Text style={styles.text_rating}>(287)</Text>
          </View>
        </View>
        <Text style={styles.title}>Black Patent Leather Lace Up Booties</Text>
        <View style={styles.options_container}>
          <TouchableOpacity
            style={[
              styles.options,
              { borderRightWidth: 0.25, borderRightColor: Colors.border },
            ]}
          >
            <Text style={styles.text_options}>Color</Text>
            {Icons.Icons({ name: "arrow_down", height: 8.7, width: 10 })}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.options,
              { borderLeftWidth: 0.25, borderLeftColor: Colors.border },
            ]}
          >
            <Text style={styles.text_options}>Size</Text>
            {Icons.Icons({ name: "arrow_down", height: 8.7, width: 10 })}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.add}>
          <Text style={styles.add_text}>Add to cart</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.action_container}>
          <TouchableOpacity style={styles.action_item}>
            {Icons.Icons({ name: "heart_white", height: 20.81, width: 23 })}
            <Text style={styles.action_text}>wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action_item}>
            {Icons.Icons({ name: "play", height: 20.81, width: 23 })}
            <Text style={styles.action_text}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action_item}>
            {Icons.Icons({ name: "share", height: 20.81, width: 23 })}
            <Text style={styles.action_text}>share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text_title}>DESCRIPTION</Text>
      <View style={styles.info_container}>
        <TouchableOpacity style={styles.info_item}>
          <Text style={styles.info_text}>Product information</Text>
          {Icons.Icons({ name: "arrow_next", height: 13, width: 8 })}
        </TouchableOpacity>
        <View
          style={[
            styles.line,
            { width: width - 16, marginBottom: 0, marginTop: 0 },
          ]}
        />
        <TouchableOpacity style={styles.info_item}>
          <Text style={styles.info_text}>Size Guide</Text>
          {Icons.Icons({ name: "arrow_next", height: 13, width: 8 })}
        </TouchableOpacity>
        <View
          style={[
            styles.line,
            { width: width - 16, marginBottom: 0, marginTop: 0 },
          ]}
        />
        <TouchableOpacity style={styles.info_item}>
          <Text style={styles.info_text}>Reviews (287)</Text>
          {Icons.Icons({ name: "arrow_next", height: 13, width: 8 })}
        </TouchableOpacity>
      </View>
      <Text style={[styles.text_title, { marginTop: 15 }]}>
        YOU MAY ALSO LIKE
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {listData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => navigation.navigate("Details")}
            >
              <Image source={item.img} style={styles.details_img} />
              <View style={styles.row_info}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.heart}>
                  {Icons.Icons({
                    name: item.status === 1 ? "heart_black" : "heart_white",
                    height: 14.67,
                    width: 16,
                  })}
                </TouchableOpacity>
              </View>
              <View style={styles.title_container}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
