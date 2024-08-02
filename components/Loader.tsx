import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="absolute z-20 bg-slate-200/10 w-full h-full items-center justify-center">
      <ActivityIndicator size={"large"} color={"#C67C4E"} />
    </View>
  );
};

export default Loader;
