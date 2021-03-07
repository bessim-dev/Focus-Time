import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 120,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]} onPress={props.onPress}>{props.title} </Text>
    </TouchableOpacity>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      height: size,
      width: size,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    text: {
      fontSize: size / 2,
    },
  });
