import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { CreateAdress } from "@/store/features/CartSlice";
import useAppWrite from "@/lib/useAppWrite";
import { getOrder } from "@/lib/appwriter";
import Loader from "@/components/Loader";

const Adress = ({ name, adress }: { name: string; adress: string }) => {
  return (
    <View className="pb-2">
      <Text className="text-lg font-sSemiBold mb-1 ">{name}</Text>
      <Text className="text-base font-sMedium text-gray-400 mb-4">
        {adress}
      </Text>
    </View>
  );
};

const cart = () => {
  const { orderId } = useLocalSearchParams();

  const { data, isLoading } = useAppWrite(() => getOrder(orderId));

  if (isLoading || !data) return <Loader></Loader>;
  const price = data.price;
  const fee = data.feePrice;
  const totalPrice = price + fee;
  const word = data.cart[0];
  let cartArray;
  if (word.includes("},{")) {
    cartArray = word.split("},{").map((el: any, i: number) => {
      if (i === word.split("},{").length - 1) return "{" + el;
      if (i === 0 && word.split("},{").length !== 1) return el + "}";
      if (i > 0) return "{" + el + "}";
    });
  } else {
    cartArray = [word];
  }

  return (
    <SafeAreaView className="">
      <ScrollView className="">
        <View className="py-8 px-8">
          <View className="flex-row items-center px-4 justify-between">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className=" w-8 h-8 "
            >
              <Image
                source={icons.left}
                resizeMode="contain"
                className="w-full h-full"
                tintColor={"black"}
              ></Image>
            </TouchableOpacity>
            <Text className="font-sSemiBold text-lg">Order</Text>
            <View className="w-8 h-8 bg-transparent"></View>
          </View>
          <Text className="font-sMedium text-lg mt-7 mb-5">
            Delivery Adress
          </Text>

          <Adress name={data.username} adress={data.adress}></Adress>

          <View className="border-b-[1px] border-gray-300 w-[90%] self-center mt-3"></View>
          <View className="mt-5 mb-2">
            {cartArray.map((el: any) => {
              const element = JSON.parse(el);
              return (
                <CartItem
                  type="order"
                  key={element.$id}
                  item={element}
                ></CartItem>
              );
            })}
          </View>
          <View className="border-b-[2.5px] border-secondary w-[200%] self-center "></View>

          <View>
            <Text className="font-sSemiBold mb-3 mt-5 text-lg">
              Payment Summary
            </Text>
            <View className="flex-row items-center mb-1 justify-between">
              <Text className="font-sLight text-base">Price</Text>
              <Text className="font-sMedium text-base">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(price)}
              </Text>
            </View>
            <View className="flex-row items-center mb-1 justify-between">
              <Text className="font-sLight text-base">Delivery Fee</Text>
              <View className="items-center justify-center gap-1 flex-row">
                <Text className="font-sRegular line-through text-gray-400 text-base"></Text>
                <Text className="font-sMedium  text-base">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(fee)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full   bg-white py-4 px-6 self-end rounded-3xl ">
          <View className=" flex-row items-center justify-between ">
            <View className="flex-row gap-2 items-center">
              <Image
                source={icons.wallet}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor={"#C67C4E"}
              ></Image>
              <View className="gap-1">
                <Text className="text-lg font-sMedium">Total</Text>
                <Text className="text-primary text-base font-sRegular">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(totalPrice)}
                </Text>
              </View>
            </View>
            <View></View>
          </View>

          <Text className="w-[90%] mt-4 self-center rounded-xl text-xl font-sSemiBold py-4 text-center bg-third text-white">
            Purchased
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default cart;
