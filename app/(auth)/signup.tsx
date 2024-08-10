import { View, Text, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { createUser, logout } from "@/lib/appwriter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loginUser } from "@/store/features/UserSlice";
import { useToast } from "react-native-toast-notifications";
import { CreateAdress } from "@/store/features/CartSlice";

const signup = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const submit = async () => {
    const { username, email, password, cpassword } = form;
    if (!username || !email || !password || !cpassword) {
      Alert.alert("Error", "Field Empty");
      return;
    }
    if (password.length < 8 || password !== cpassword) {
      Alert.alert("Error", "Password Incorrect");
      return;
    }
    setisLoading(true);
    //await logout();
    const newUser = await createUser({ email, password, username });
    if (!newUser) {
      toast.show("Sign Up Failed", { type: "danger" });
    } else {
      dispatch(loginUser(newUser));
      dispatch(CreateAdress({ username: newUser.username, adress: "" }));
      toast.show("Sign Up Successfully", { type: "success" });
    }
    setisLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 px-8 py-12">
      <ScrollView>
        <View className="items-center justify-center">
          <Text className="text-2xl font-sSemiBold tracking-widest text-primary">
            Sign Up
          </Text>
          <FormField
            title="username"
            value={form.username}
            placeholder="Username"
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            OtherStyles=""
          ></FormField>
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
          <FormField
            title="Confirm Password"
            value={form.cpassword}
            placeholder="Confirm Password"
            handleChangeText={(e: any) => setForm({ ...form, cpassword: e })}
            OtherStyles=""
          ></FormField>
          <CustomButton
            text={`${isLoading ? "Creating..." : "Sign Up"}`}
            width="w-[100%]"
            height=""
            containerStyles=" py-4 my-6"
            callback={() => {
              submit();
            }}
          ></CustomButton>

          <Text className="text-lg font-sMedium">
            Already registred ?{" "}
            <Link
              className="text-primary text-lg underline font-sMedium"
              href={"/signin"}
            >
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
