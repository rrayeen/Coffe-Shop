import {
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import icons from "@/constants/icons";
import FiltredCoffe from "@/components/FiltredCoffe";
import CoffeComponents from "@/components/CoffeComponents";
import { StatusBar } from "expo-status-bar";
import useAppWrite from "@/lib/useAppWrite";
import { coffeSearch, getAllCoffes, logout } from "@/lib/appwriter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logoutUser } from "@/store/features/UserSlice";
import { useToast } from "react-native-toast-notifications";
import { clearCart } from "@/store/features/CartSlice";

const Home = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [focused, setFocused] = useState("All Coffe");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: coffe, isLoading, refreshing } = useAppWrite(getAllCoffes);
  const {
    data: searchCoffe,
    isLoading: load,
    refreshing: refreshingSearch,
  } = useAppWrite(() => coffeSearch(search));
  const toast = useToast();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refreshing();
    await refreshingSearch();
    setIsRefreshing(false);
  };

  let data;
  if (!data && !searchCoffe) data = [];
  else if (searchCoffe.length) data = searchCoffe;
  else data = coffe;

  if (search.length < 3) data = coffe;
  if (!data) data = [];

  const array = new Set();
  array.add("All Coffe");
  data.map((el: any) => array.add(el.type));
  const typesArray = [...array];
  let FiltredData;
  if (focused === "All Coffe") FiltredData = data;
  else FiltredData = data.filter((el: any) => el.type === focused);

  return (
    <SafeAreaView className="flex-1 relative bg-[#222222]">
      <View className="h-full pb-4  bg-fifth">
        <FlatList
          data={FiltredData || []}
          ListHeaderComponent={
            <>
              <View className="bg-[#222222]  h-80 py-6 px-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-col gap-2">
                    <Text className="text-xl font-sSemiBold text-white tracking-widest">
                      Welcome
                    </Text>
                    <Text className="text-lg  font-sMedium text-fourth tracking-wider">
                      {user?.username}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={async () => {
                      await logout();
                      dispatch(logoutUser());
                      dispatch(clearCart());
                      toast.show("Logged Out Successfully", {
                        type: "success",
                      });
                    }}
                  >
                    <Image
                      source={icons.logout}
                      className="w-10 h-10"
                      resizeMode="contain"
                      tintColor={"red"}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <View className="mt-12 flex-row items-center ">
                  <CustomInput
                    refresh={refreshingSearch}
                    setSearch={setSearch}
                    search={search}
                  ></CustomInput>
                </View>
              </View>

              <View className="mx-4 overflow-hidden  h-48 rounded-2xl mb-10 mt-[-75] bg-slate-50">
                <ImageBackground
                  source={{
                    uri: "https://w0.peakpx.com/wallpaper/917/658/HD-wallpaper-coffe-and-cinamon-cinamon-coffe-aroma-brown.jpg",
                  }}
                  resizeMode="cover"
                  className="h-full w-full"
                >
                  <View className=" rounded-xl mt-5  overflow-hidden ml-8 w-24 ">
                    <Text className="py-1 px-2 font-sMedium text-center bg-red-400 text-lg tracking-widest text-white">
                      Promo
                    </Text>
                  </View>
                  <View className="bg-black mt-6 ml-7 w-1/2 ">
                    <Text className="text-white font-sSemiBold text-center mt-[-12]  pb-2 text-3xl">
                      Buy one get
                    </Text>
                  </View>
                  <View className="bg-black mt-6 ml-7 w-1/2 ">
                    <Text className="text-white font-sSemiBold text-center mt-[-12]  pb-2 text-3xl">
                      One FREE
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View className="px-2">
                <FiltredCoffe
                  focused={focused}
                  setFocused={setFocused}
                  item={typesArray}
                ></FiltredCoffe>
              </View>
            </>
          }
          renderItem={(item: any) =>
            isLoading ? (
              <View className="w-full h-10 items-center justify-center">
                <ActivityIndicator size={"large"} color={"#C67C4E"} />
              </View>
            ) : (
              <CoffeComponents item={item.item}></CoffeComponents>
            )
          }
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            ></RefreshControl>
          }
        ></FlatList>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
