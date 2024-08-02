import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { router } from "expo-router";
import FiltredCoffe from "@/components/FiltredCoffe";
import CoffeComponents from "@/components/CoffeComponents";
import BookmarkedCoffe from "@/components/BookmarkedCoffe";
import useAppWrite from "@/lib/useAppWrite";
import { getBookmarked } from "@/lib/appwriter";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/store/store";

const bookmark = () => {
  const [focused, setFocused] = useState("All Coffe");
  const [isrefreshing, setIsRefreshing] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const { $id } = user;

  const {
    data: book,
    isLoading,
    refreshing,
  } = useAppWrite(() => getBookmarked($id));
  const onRefresh = async () => {
    setIsRefreshing(true);
    await refreshing();
    setIsRefreshing(false);
  };

  if (!book || isLoading) return <Loader></Loader>;
  const data = book.coffes;
  const array = new Set();
  array.add("All Coffe");
  data.map((el: any) => array.add(el.type));
  const typesArray = [...array];
  let FiltredData;
  if (focused === "All Coffe") FiltredData = data;
  else FiltredData = data.filter((el: any) => el.type === focused);

  return (
    <SafeAreaView className="">
      <View className="py-8 px-2">
        <View className="flex-row items-center px-10 justify-between">
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
          <Text className="font-sSemiBold text-lg">Bookmarked</Text>
          <View className="w-8 h-8 bg-transparent"></View>
        </View>
        <FlatList
          data={FiltredData || []}
          ListHeaderComponent={
            <View className="px-2 mt-8 mb-3">
              <FiltredCoffe
                focused={focused}
                setFocused={setFocused}
                item={typesArray}
              ></FiltredCoffe>
            </View>
          }
          renderItem={(item: any) => (
            <BookmarkedCoffe
              refreshing={refreshing}
              book={book}
              item={item}
            ></BookmarkedCoffe>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isrefreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
          ListEmptyComponent={
            <Text className="text-xl text-third font-sSemiBold text-center self-center my-16">
              No Coffe Here
            </Text>
          }
        ></FlatList>
      </View>
      <StatusBar barStyle={"dark-content"}></StatusBar>
    </SafeAreaView>
  );
};

export default bookmark;
