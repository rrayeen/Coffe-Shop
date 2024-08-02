import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

const FormField = ({
  title,
  value,
  handleChangeText,
  OtherStyles,

  placeholder,
}: {
  title: string;
  value: string;
  handleChangeText: any;
  OtherStyles: string;

  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 mt-6 ${OtherStyles}`}>
      <Text className={`text-base text-black font-sMedium mx-1`}>{title}</Text>
      <View className="border-2  flex-row  border-secondary w-full h-16 px-4 bg-black/5  rounded-2xl focus:border-primary items-center">
        <TextInput
          className="flex-1 text-third    w-full px-4 font-sMedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
        ></TextInput>
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity
            className=""
            onPress={() => setShowPassword((p) => !p)}
          >
            <Image
              source={showPassword === true ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            ></Image>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
