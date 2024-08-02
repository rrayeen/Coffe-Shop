import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addToCart,
  clearCart,
  inscreaseQuantity,
  removeFromCart,
} from "@/store/features/CartSlice";
import { useToast } from "react-native-toast-notifications";

const CoffeComponents = ({ item }: { item: any }) => {
  const { image, price, rating, name, type, $id } = item;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const coffe = cart.find((el: any) => el.$id === $id);
  const toast = useToast();
  return (
    <View className="bg-white flex-col-re rounded-xl px-2 mx-1 w-[48%] pt-2 pb-4  mt-7">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/item/${$id}`)}
        className=" overflow-hidden relative mb-2 rounded-xl bg-black "
      >
        <View className="bg-third/40 px-2 py-3 w-24 rounded-3xl absolute justify-start  top-0 right-[-20] z-10 items-center  flex-row gap-2">
          <Image
            source={icons.star}
            className="w-4 h-4"
            resizeMode="contain"
          ></Image>
          <Text className="font-sRegular text-base text-white">{rating}</Text>
        </View>
        <Image
          source={{ uri: image }}
          className="h-40"
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>
      <View>
        <Text className="font-sMedium mb-0.5 text-2xl">{name}</Text>
        <Text className="text-gray-400 font-sLight">{type}</Text>
        <View className="flex-row items-center mt-1 justify-between">
          <Text className="font-sSemiBold text-2xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (coffe) {
                dispatch(removeFromCart($id));
                toast.show("Coffe Removed", { type: "warning" });
              } else {
                dispatch(
                  addToCart({
                    $id,
                    image,
                    name,
                    price,
                    type,
                    rating,
                    quantity: 1,
                  })
                );
                toast.show("Coffe Added", { type: "success" });
              }
            }}
            className="bg-primary w-12 h-12 p-3 rounded-lg"
          >
            <Image
              source={coffe ? icons.close : icons.mini_plus}
              className="w-full h-full"
              resizeMode="contain"
              tintColor={"white"}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CoffeComponents;
