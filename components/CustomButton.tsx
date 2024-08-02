import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  width,
  height,
  containerStyles,
  callback,
}: {
  text: string;
  width: string;
  height: string;
  containerStyles: string;
  callback: any;
}) => {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.7}
      className={`bg-primary rounded-2xl items-center justify-center ${containerStyles}  ${width} ${height}`}
    >
      <Text className={`text-white text-base  font-sSemiBold `}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
