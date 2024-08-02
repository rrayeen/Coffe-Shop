import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useAppDispatch } from "@/store/store";
import {
  decreaseQuantity,
  inscreaseQuantity,
  removeFromCart,
} from "@/store/features/CartSlice";

const CartItem = ({ item, type = "cart" }: { type: string; item: any }) => {
  const dispatch = useAppDispatch();

  return (
    <View className="flex-row items-center mb-2 justify-between">
      <View className="flex-row gap-2">
        <View className="h-20 w-20 rounded-xl overflow-hidden">
          <Image
            className="w-full h-full"
            resizeMode="cover"
            source={{ uri: item.image }}
          ></Image>
        </View>
        <View className="flex-col gap-1">
          <Text className="text-lg font-sMedium">{item.name}</Text>
          <Text className="text-base font-sLight text-gray-400">
            {item.type}
          </Text>
        </View>
      </View>
      {type === "cart" ? (
        <View className="flex-row justify-between gap-3 items-center">
          <TouchableOpacity
            onPress={() => {
              if (item.quantity > 1) dispatch(decreaseQuantity(item.$id));
              else dispatch(removeFromCart(item.$id));
            }}
            className="rounded-full overflow-hidden p-0.5 bg-white"
          >
            <Image
              source={icons.mini_minus}
              className="h-4 w-4"
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <Text className="font-sMedium text-base">{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(inscreaseQuantity(item.$id));
            }}
            className="rounded-full overflow-hidden p-0.5  bg-white"
          >
            <Image
              source={icons.mini_plus}
              className="h-4   w-4"
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CartItem;
