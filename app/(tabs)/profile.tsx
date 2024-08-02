import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAppSelector } from "@/store/store";
import useAppWrite from "@/lib/useAppWrite";
import { getAllOrders } from "@/lib/appwriter";
import OrderComponent from "@/components/OrderComponent";
import Loader from "@/components/Loader";
import { useToast } from "react-native-toast-notifications";

const profile = () => {
  const toast = useToast();
  const user = useAppSelector((state) => state.user.user);
  const { data, isLoading, refreshing } = useAppWrite(() =>
    getAllOrders(user.$id)
  );

  if (isLoading && !data) return <Loader></Loader>;
  return (
    <SafeAreaView className="flex-1 py-8 px-4 ">
      <ScrollView>
        <View className="w-full items-center justify-center mt-8">
          <View className="w-40 h-40   p-1  rounded-2xl border-2  border-primary">
            <Image
              className="w-full h-full rounded-xl"
              resizeMode="cover"
              source={{
                uri: user.image,
              }}
            ></Image>
          </View>
          <Text className="text-xl font-sSemiBold tracking-wide mt-4">
            {user.username}
          </Text>
        </View>
        <View>
          <Text className="font-sSemiBold text-primary text-lg mt-10">
            Orders
          </Text>
          {data && data.length ? (
            data.map((el: any, i: number) => (
              <OrderComponent
                key={el.$id}
                id={el.$id}
                date={el.$createdAt}
                i={i + 1}
              ></OrderComponent>
            ))
          ) : (
            <Text className="self-center mt-12 text-xl font-sSemiBold text-third tracking-wider">
              No Orders Yet
            </Text>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-xl mt-6 self-center bg-third py-3 px-4"
          onPress={async () => {
            await refreshing(), toast.show("Refreshed", { type: "success" });
          }}
        >
          <Text className="text-lg text-white font-sSemiBold text-center">
            Refresh
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default profile;
