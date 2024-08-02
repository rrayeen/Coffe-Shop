import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import useAppWrite from "@/lib/useAppWrite";
import { getBookmarked, getCoffe, updateBookMark } from "@/lib/appwriter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart, inscreaseQuantity } from "@/store/features/CartSlice";
import Loader from "@/components/Loader";
import { useToast } from "react-native-toast-notifications";

const Coffe = () => {
  const toast = useToast();
  const [bookmarking, setBookmarking] = useState(false);
  const { itemId } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const { data, isLoading } = useAppWrite(() => getCoffe({ itemId }));
  const user = useAppSelector((state) => state.user.user);
  const { $id: userId } = user;
  const {
    data: book,
    isLoading: loadingBookMark,
    refreshing,
  } = useAppWrite(() => getBookmarked(userId));

  const [size, setSize] = useState("M");
  if (!book || bookmarking || loadingBookMark || isLoading || !data)
    return <Loader></Loader>;
  const coffe = data.at(0);
  const { $id, image, name, price: oldPrice, type, rating } = coffe;
  let price: any;
  if (size === "M") {
    price = oldPrice;
  }
  if (size === "S") {
    price = oldPrice * 0.75;
  }
  if (size === "L") {
    price = oldPrice * 1.5;
  }
  const coffeCart = cart.find((el: any) => el.$id === $id);

  const booked = book.coffes.find((el: any) => el.$id === itemId);
  const onBookMarked = async () => {
    setBookmarking(true);
    if (booked) {
      const newBooked = book.coffes.filter((el: any) => el.$id !== itemId);
      const newData = { coffes: newBooked, usersss: user };
      await updateBookMark(book.$id, newData);
      toast.show("UnBookMarked Coffe", { type: "warning" });
    }
    if (!booked) {
      const newBooked = [...book.coffes, coffe];
      const newData = { coffes: newBooked, usersss: user };
      await updateBookMark(book.$id, newData);
      toast.show("BookMarked Coffe", { type: "success" });
    }
    await refreshing();
    setBookmarking(false);
  };
  return (
    <SafeAreaView className="bg-fifth ">
      <ScrollView>
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
            <Text className="font-sSemiBold text-lg">Details</Text>
            <TouchableOpacity
              onPress={() => {
                onBookMarked();
              }}
              activeOpacity={0.6}
              className=" w-8 h-8"
            >
              <Image
                source={booked ? icons.like : icons.heart}
                resizeMode="contain"
                className="w-full h-full"
                tintColor={booked ? "" : "black"}
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="w-full mt-7 h-60 rounded-2xl overflow-hidden">
            <Image
              source={{ uri: coffe.image }}
              resizeMode="cover"
              className="w-full h-full"
            ></Image>
          </View>

          <Text className="mt-5 text-3xl font-sMedium">{coffe.name}</Text>
          <View className="items-center justify-between flex-row">
            <Text className="text-gray-400 font-sLight text-sm">
              {coffe.type}
            </Text>
            <View className="items-center justify-center flex-row gap-5">
              <View className="w-9  h-9 p-1 bg-fourth rounded-lg">
                <Image
                  source={icons.shipping}
                  className="w-full h-full"
                  resizeMode="contain"
                  tintColor={"#C67C4E"}
                ></Image>
              </View>
              <View className="w-9  h-9 p-1 bg-fourth rounded-lg">
                <Image
                  source={icons.coffee_beans}
                  className="w-full h-full"
                  resizeMode="contain"
                  tintColor={"#C67C4E"}
                ></Image>
              </View>
              <View className="w-9  h-9 p-1 bg-fourth rounded-lg">
                <Image
                  source={icons.coffee}
                  className="w-full h-full"
                  resizeMode="contain"
                  tintColor={"#C67C4E"}
                ></Image>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-2 mt-2">
            <Image
              source={icons.star}
              resizeMode="contain"
              className="w-6 h-6"
            ></Image>
            <Text className="font-sRegular text-lg">{coffe.rating}</Text>
            <Text className="font-sRegular text-gray-400 text-sm">
              ({coffe.ratingNumber})
            </Text>
          </View>
          <View className="border-b-[1px] border-gray-300 w-[90%] self-center mt-3"></View>
          <View className="py-2">
            <Text className="font-sSemiBold text-lg">Description</Text>
            <Text className="font-sRegular text-base text-gray-400">
              {coffe.description}
            </Text>
          </View>
          <View>
            <Text className="text-lg font-sSemiBold">Size</Text>
            <View className="flex-row items-center justify-center gap-6 mt-0">
              <TouchableOpacity
                onPress={() => setSize("S")}
                activeOpacity={0.9}
                className={`${
                  size === "S"
                    ? "border-primary  bg-secondary"
                    : "border-gray-300 bg-white"
                } w-[28%] py-2  border rounded-xl`}
              >
                <Text
                  className={`${
                    size === "S"
                      ? "border-primary text-primary bg-secondary"
                      : "border-gray-300 bg-white"
                  }  text-lg font-sRegular  text-center`}
                >
                  S
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSize("M")}
                activeOpacity={0.9}
                className={`${
                  size === "M"
                    ? "border-primary  bg-secondary"
                    : "border-gray-300 bg-white"
                } w-[28%] py-2  border rounded-xl`}
              >
                <Text
                  className={`${
                    size === "M"
                      ? "border-primary text-primary bg-secondary"
                      : "border-gray-300 bg-white"
                  }  text-lg font-sRegular  text-center`}
                >
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSize("L")}
                activeOpacity={0.9}
                className={`${
                  size === "L"
                    ? "border-primary  bg-secondary"
                    : "border-gray-300 bg-white"
                } w-[28%] py-2  border rounded-xl`}
              >
                <Text
                  className={`${
                    size === "L"
                      ? "border-primary text-primary bg-secondary"
                      : "border-gray-300 bg-white"
                  }  text-lg font-sRegula  text-center`}
                >
                  L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="bg-white px-6 py-4 pb-4 w-full self-center rounded-t-3xl items-center flex-row justify-between">
          <View className="py-4">
            <Text className="text-gray-400 text-base font-sRegular">Price</Text>
            <Text className="text-primary text-lg font-sSemiBold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (coffeCart) {
                router.push("/cart");
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
                toast.show("Added To Cart", { type: "success" });
              }
            }}
            className="bg-primary py-5 px-16 rounded-2xl"
          >
            <Text className="text-white font-sSemiBold text-xl">
              {coffeCart ? "In Cart" : "Buy now"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="dark"></StatusBar>
    </SafeAreaView>
  );
};

export default Coffe;
