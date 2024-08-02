import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { Image } from "react-native";
import icons from "@/constants/icons";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    "Sora-Bold": require("@/assets/fonts/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("@/assets/fonts/Sora-ExtraBold.ttf"),
    "Sora-ExtraLight": require("@/assets/fonts/Sora-ExtraLight.ttf"),
    "Sora-Light": require("@/assets/fonts/Sora-Light.ttf"),
    "Sora-Medium": require("@/assets/fonts/Sora-Medium.ttf"),
    "Sora-Regular": require("@/assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("@/assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Thin": require("@/assets/fonts/Sora-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw new Error();
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) return null;
  return (
    <>
      <Provider store={store}>
        <ToastProvider
          placement="bottom"
          duration={3000}
          animationType="zoom-in"
          successIcon={
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={icons.correct}
            ></Image>
          }
          dangerIcon={
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={icons.warning}
            ></Image>
          }
          warningIcon={
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={icons.warning}
            ></Image>
          }
          textStyle={{
            fontFamily: "Sora-Regular",
            fontSize: 18,
            paddingHorizontal: 12,
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="item/[itemId]" />
            <Stack.Screen name="order/[orderId]" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </ToastProvider>
      </Provider>
    </>
  );
}
