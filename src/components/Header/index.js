import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icons from "../../themes/Icons";
import styles from "./styles";

export default function Header({
  onPress,
  leftIcon = "menu",
  logo = "logo",
  shownRightItem = true,
  title = null,
  showBottomLine = false,
  style,
  shownTitle = true,
  right_content,
}) {
  return (
    <View style={style}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.left_item} onPress={onPress}>
          {leftIcon}
        </TouchableOpacity>
        {shownTitle &&
          (title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            Icons.Icons({ name: logo, height: 30, width: 30 })
          ))}
        {shownRightItem ? (
          right_content ? (
            right_content
          ) : (
            <View style={styles.right_item}>
              <TouchableOpacity>
                {Icons.Icons({ name: "search", height: 17, width: 17 })}
              </TouchableOpacity>
              <TouchableOpacity style={styles.cart}>
                {Icons.Icons({ name: "cart", height: 24, width: 21 })}
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View style={styles.right_item} />
        )}
      </View>
      {showBottomLine && <View style={styles.line} />}
    </View>
  );
}
