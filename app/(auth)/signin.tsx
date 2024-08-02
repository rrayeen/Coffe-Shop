import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getUser, login, logout } from "@/lib/appwriter";
import useAppWrite from "@/lib/useAppWrite";
import { loginUser, logoutUser } from "@/store/features/UserSlice";
import { useToast } from "react-native-toast-notifications";

const signin = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  const submit = async () => {
    setisLoading(true);
    //await logout();
    const session = await login(form);
    const user = await getUser(session.userId);
    dispatch(loginUser(user));
    setisLoading(false);
    toast.show("Logged In Successfully", { type: "success" });
  };

  return (
    <SafeAreaView className="flex-1 px-8 py-12">
      <View className="items-center justify-center">
        <Text className="text-2xl font-sSemiBold tracking-widest text-primary">
          Login
        </Text>

        <FormField
          title="Email"
          value={form.email}
          placeholder="Email"
          handleChangeText={(e: any) => setForm({ ...form, email: e })}
          OtherStyles=""
        ></FormField>
        <FormField
          title="Password"
          value={form.password}
          placeholder="Password"
          handleChangeText={(e: any) => setForm({ ...form, password: e })}
          OtherStyles=""
        ></FormField>

        <CustomButton
          text={`${isLoading ? "Logging..." : "Login"}`}
          width="w-[100%]"
          height=""
          containerStyles=" py-4 my-6"
          callback={() => {
            submit();
          }}
        ></CustomButton>

        <Text className="text-lg font-sMedium">
          You don't have account ?{" "}
          <Link
            className="text-primary text-lg underline font-sMedium"
            href={"/signup"}
          >
            Sign Up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default signin;
