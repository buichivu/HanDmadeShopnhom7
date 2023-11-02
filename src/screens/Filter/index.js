import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import Header from "../../components/Header";
import Colors from "../../themes/Colors";
import Icons from "../../themes/Icons";
import Images from "../../themes/Images";
import styles from "./styles";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

var { height, width } = Dimensions.get("window");

const colorData = [
  {
    id: 0,
    color: "#000000",
  },
  {
    id: 1,
    color: "#AC5265",
  },
  {
    id: 2,
    color: "#FED9E5",
  },
  {
    id: 3,
    color: "#F6C197",
  },
  {
    id: 4,
    color: "#ECDECE",
  },
];

const sizeData = [
  {
    id: 0,
    size: "XS",
  },
  {
    id: 1,
    size: "S",
  },
  {
    id: 2,
    size: "M",
  },
  {
    id: 3,
    size: "L",
  },
  {
    id: 4,
    size: "XL",
  },
];

export default function Filter({ navigation }) {
  const [colorSelected, setColorSelected] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(0);
  const [multiSliderValue, setMultiSliderValue] = React.useState([35, 75]);

  multiSliderValuesChange = (values) => setMultiSliderValue(values);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={Icons.Icons({ name: "back_arrow", height: 20, width: 20 })}
        title="Filter"
        shownRightItem={false}
        onPress={() => navigation.goBack()}
        showBottomLine={true}
      />
      <ImageBackground source={Images.bg} style={styles.bg}>
        <View style={styles.content_container}>
          <Text style={styles.options_text}>COLOR</Text>
          <View style={styles.options_container}>
            {colorData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.color, { backgroundColor: item.color }]}
                  onPress={() => setColorSelected(item.id)}
                >
                  {colorSelected === index
                    ? Icons.Icons({ name: "check", height: 9.17, width: 11.91 })
                    : null}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.line} />
          <Text style={styles.options_text}>SIZE</Text>
          <View style={styles.options_container}>
            {sizeData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.color,
                    {
                      backgroundColor:
                        sizeSelected === index ? Colors.black : Colors.white,
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => setSizeSelected(item.id)}
                >
                  <Text
                    style={[
                      styles.text_size,
                      {
                        color:
                          sizeSelected === index ? Colors.white : Colors.black,
                      },
                    ]}
                  >
                    {item.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.line} />
          <Text style={styles.options_text}>PRICE</Text>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={width - 32}
            onValuesChange={multiSliderValuesChange}
            min={0}
            max={100}
            step={5}
            allowOverlap
            snapped
            unselectedStyle={{ backgroundColor: Colors.gray_text2, height: 1 }}
            selectedStyle={{ backgroundColor: Colors.black, height: 2 }}
            customMarker={() => <View style={styles.marker} />}
          />
          <View style={styles.price_container}>
            <Text style={styles.price}>from ${multiSliderValue[0]}</Text>
            <Text style={styles.price}>to ${multiSliderValue[1]}</Text>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.apply}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.apply_text}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}
