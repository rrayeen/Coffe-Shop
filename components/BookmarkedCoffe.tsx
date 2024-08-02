import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useAppSelector } from "@/store/store";
import { updateBookMark } from "@/lib/appwriter";
import Loader from "./Loader";
import { useToast } from "react-native-toast-notifications";

const BookmarkedCoffe = ({
  item,
  book,
  refreshing,
}: {
  refreshing: any;
  item: any;
  book: any;
}) => {
  const user = useAppSelector((state) => state.user.user);
  const [bookmarked, setBookmarking] = useState(false);
  const { name, type, price, $id, image } = item.item;
  const toast = useToast();

  const onBookMarked = async () => {
    setBookmarking(true);

    const newBooked = book.coffes.filter((el: any) => el.$id !== $id);
    const newData = { coffes: newBooked, usersss: user };
    await updateBookMark(book.$id, newData);
    await refreshing();

    setBookmarking(false);
    toast.show("UnBookMarked Coffe", { type: "warning" });
  };

  return (
    <View className="flex-row items-center justify-between bg-white rounded-2xl px-2 py-3 mt-4">
      <View className="items-center justify-center flex-row gap-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.navigate(`/item/${$id}`);
          }}
        >
          <Image
            source={{
              uri: image,
            }}
            resizeMode="cover"
            className="w-16 rounded-lg h-16"
          ></Image>
        </TouchableOpacity>
        <View className="py-2">
          <Text className="font-sMedium  text-2xl">{name}</Text>
          <Text className="text-gray-400 font-sLight">{type}</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className="text-primary text-base font-sRegular">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            onBookMarked();
          }}
          className="p-2 bg-fourth rounded-full"
        >
          <Image
            source={icons.close}
            className="w-4 h-4"
            resizeMode="contain"
            tintColor={"white"}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookmarkedCoffe;
