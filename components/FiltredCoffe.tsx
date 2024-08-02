import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const Filtred = ({
  setFocused,
  focused,
  type,
}: {
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  focused: boolean;
  type: string;
}) => {
  return (
    <TouchableOpacity
      className={` ${
        focused ? "bg-primary" : "bg-fourth"
      } mr-5 py-2 rounded-xl  px-3`}
      activeOpacity={0.7}
      onPress={() => {
        setFocused(type);
      }}
    >
      <Text className="text-xl font-sRegular text-black">{type}</Text>
    </TouchableOpacity>
  );
};

const FiltredCoffe = ({
  focused,
  setFocused,
  item,
}: {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  item: any;
}) => {
  return (
    <FlatList
      data={item}
      keyExtractor={(key) => key}
      renderItem={(item: any) => (
        <Filtred
          setFocused={setFocused}
          focused={focused === item.item}
          type={item.item}
        ></Filtred>
      )}
      horizontal
    ></FlatList>
  );
};

export default FiltredCoffe;
