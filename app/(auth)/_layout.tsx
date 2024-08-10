import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import useAppWrite from "@/lib/useAppWrite";
import { loginUser, logoutUser } from "@/store/features/UserSlice";
import { getCurrentUser } from "@/lib/appwriter";

const _layout = () => {
  const { data, isLoading } = useAppWrite(getCurrentUser);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!data) dispatch(logoutUser());
    if (data) dispatch(loginUser(data));
    if (isLoggedIn) router.replace("/home");
  }, [data, isLoggedIn, dispatch]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup"></Stack.Screen>
      <Stack.Screen name="signin"></Stack.Screen>
    </Stack>
  );
};

export default _layout;
