import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import icons from "@/constants/icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import useAppWrite from "@/lib/useAppWrite";
import { loginUser, logoutUser } from "@/store/features/UserSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser } from "@/lib/appwriter";

const _layout = () => {
  const { data, isLoading } = useAppWrite(getCurrentUser);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) dispatch(logoutUser());
    if (!isLoggedIn) router.replace("/signin");
  }, [data, user, isLoggedIn, dispatch]);

  function TabBar({
    title,
    color,
    icon,
    focused,
    fill,
  }: {
    title: string;
    color: any;
    fill: any;
    icon: any;
    focused: boolean;
  }) {
    return (
      <View className=" justify-center gap-2 items-center">
        <Image
          source={focused ? fill : icon}
          tintColor={color}
          className="w-6 h-6"
          resizeMode="contain"
        ></Image>
        <Text
          className={`${
            focused
              ? `font-sSemiBold text-primary`
              : " text-[#A2A2A2] font-sRegular"
          } text-sm`}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 84,
          backgroundColor: "#EDEDED",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#C67C4E",
        tabBarInactiveTintColor: "#A2A2A2",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBar
              icon={icons.home}
              fill={icons.home_fill}
              color={color}
              focused={focused}
              title="Home"
            ></TabBar>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabBar
              icon={icons.shopping}
              fill={icons.shopping_fill}
              color={color}
              focused={focused}
              title="Cart"
            ></TabBar>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabBar
              icon={icons.heart}
              fill={icons.heart_fill}
              color={color}
              focused={focused}
              title="Bookmark"
            ></TabBar>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBar
              icon={icons.user}
              fill={icons.user_fill}
              color={color}
              focused={focused}
              title="Profile"
            ></TabBar>
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default _layout;
