import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import icons from "@/constants/icons";

const CustomInput = ({
  search,
  setSearch,
  refresh,
}: {
  search: string;
  setSearch: any;
  refresh: any;
}) => {
  return (
    <View className=" flex-row  rounded-lg    bg-third w-[85%] py-4 px-2 ">
      <TouchableOpacity
        activeOpacity={0.8}
        className="ml-2 mr-4"
        onPress={async () => {
          setSearch(search);
          await refresh();
        }}
      >
        <Image
          source={icons.search}
          className="w-6 h-6"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
      <TextInput
        className="placeholder:font-sExtraLight w-full text-white  placeholder:text-base "
        placeholder="Search Coffee"
        placeholderTextColor={"#e3e3e3"}
        onChangeText={async (e) => {
          setSearch(e);
          await refresh();
        }}
        value={search}
      ></TextInput>
    </View>
  );
};

export default CustomInput;
