import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function Index() {
  return (
    <SafeAreaView className="flex-1  bg-black">
      <View className="h-[65%] items-center w-full">
        <ImageBackground
          source={images.coffe_Background}
          className="h-full w-full"
          resizeMode="cover"
        ></ImageBackground>
        <Text className="text-white font-sSemiBold text-4xl mt-[-45px]  leading-[50px]  text-center px-10">
          Fall in Love with Coffe in Blissful Delight!
        </Text>
        <Text className="text-fourth text-center px-8 mt-3 text-base">
          Welcome to our crazy coffe corner, where every cup is delightful for
          you
        </Text>
        <CustomButton
          text="Get started"
          width="w-[75%]"
          height="h-[50px]"
          containerStyles="mt-7 "
          callback={() => {
            router.push("/signin");
          }}
        ></CustomButton>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
