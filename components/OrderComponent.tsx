import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const OrderComponent = ({
  id,
  date,
  i,
}: {
  id: string;
  date: string;
  i: number;
}) => {
  function DateFormat(date: string) {
    const newDate = new Date(Date.parse(date));
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const hour = String(newDate.getHours()).padStart(2, "0");
    const minute = String(newDate.getMinutes()).padStart(2, "0");
    const second = String(newDate.getSeconds()).padStart(2, "0");
    return `(${day}/${month}/${year} - ${hour}:${minute}:${second})`;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate(`/order/${id}`);
      }}
      activeOpacity={0.7}
      className="mt-4 bg-white rounded-3xl py-3 px-4 "
    >
      <View>
        <Text className="font-sMedium text-base mb-1">Order N°{i} </Text>
        <Text className="text-gray-400 text-base font-sLight">
          {DateFormat(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderComponent;
