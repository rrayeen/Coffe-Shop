import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import icons from "@/constants/icons";
import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearCart, CreateAdress } from "@/store/features/CartSlice";
import { OrderCart } from "@/lib/appwriter";
import { useToast } from "react-native-toast-notifications";

const AdressForm = ({
  setIsEditing,
  defaultUserName,
}: {
  defaultUserName: string;
  setIsEditing: any;
}) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ adress: "", username: defaultUserName });

  return (
    <View className="flex-col gap-3">
      <TextInput
        value={form.username}
        placeholder="Username"
        className="py-2 px-4 text-lg font-sRegular  placeholder:font-sMedium rounded-xl bg-fourth"
        placeholderTextColor={"#424141"}
        onChangeText={(e) => setForm({ ...form, username: e })}
      ></TextInput>
      <TextInput
        value={form.adress}
        placeholder="Full Adress"
        className="py-2 px-4 text-lg font-sRegular  placeholder:font-sMedium rounded-xl bg-fourth"
        placeholderTextColor={"#424141"}
        onChangeText={(e) => setForm({ ...form, adress: e })}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          dispatch(CreateAdress(form));
          setIsEditing((e: boolean) => !e);
        }}
        activeOpacity={0.7}
        className="py-3 px-6 self-end bg-primary rounded-2xl"
      >
        <Text className="text-base font-sSemiBold text-fourth">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};
const Adress = ({
  name,
  adress,
  setIsEditing,
}: {
  setIsEditing: any;
  name: string;
  adress: string;
}) => {
  return (
    <View className="pb-2">
      <Text className="text-lg font-sSemiBold mb-1 ">{name}</Text>
      <Text className="text-base font-sMedium text-gray-400 mb-4">
        {adress}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsEditing((e: boolean) => !e);
        }}
        activeOpacity={0.7}
        className="w-1/2 rounded-3xl flex-row items-center justify-center px-2 py-1 border-gray-300 border "
      >
        <Image
          source={icons.compose}
          className="h-6 w-6"
          resizeMode="contain"
        ></Image>
        <Text className="font-sRegular text-base">Edit Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const cart = () => {
  const toast = useToast();

  const { adress, username } = useAppSelector((state) => state.cart);
  const cart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [isOrdering, setIsOrdering] = useState(false);

  const [isopen, setIsopen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  if (!cart.length)
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="font-sBold text-3xl">Cart Empty</Text>
        <StatusBar style="dark"></StatusBar>
      </SafeAreaView>
    );

  const price = cart.reduce((curr: any, acc: any) => {
    return curr + acc.price * acc.quantity;
  }, 0);
  const fee = 1.5;
  const totalPrice = price + fee;

  return (
    <SafeAreaView className="">
      <ScrollView>
        <View className="py-8 px-8">
          <View className="flex-row items-center px-4 justify-between">
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
            <Text className="font-sSemiBold text-lg">Cart</Text>
            <View className="w-8 h-8 bg-transparent"></View>
          </View>
          <Text className="font-sMedium text-lg mt-7 mb-5">
            Delivery Adress
          </Text>
          {isEditing || !adress || !username ? (
            <AdressForm
              defaultUserName={username}
              setIsEditing={setIsEditing}
            ></AdressForm>
          ) : (
            <Adress
              setIsEditing={setIsEditing}
              name={username}
              adress={adress}
            ></Adress>
          )}
          <View className="border-b-[1px] border-gray-300 w-[90%] self-center mt-3"></View>
          <View className="mt-5 mb-2">
            {cart.map((el: any) => (
              <CartItem type="cart" key={el.$id} item={el}></CartItem>
            ))}
          </View>
          <View className="border-b-[2.5px] border-secondary w-[200%] self-center "></View>

          <TouchableOpacity className="bg-white mt-6 flex-row items-center justify-between py-3 px-5 rounded-2xl">
            <View className="flex-row items-center">
              <Image
                source={icons.discount}
                className="w-5 h-5 mr-3"
                resizeMode="contain"
                tintColor={"#C67C4E"}
              ></Image>
              <Text className="font-sMedium text-lg">
                1 Discount is Applies
              </Text>
            </View>
            <Image
              source={icons.next}
              className="w-5 h-5  "
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <View>
            <Text className="font-sSemiBold mb-3 mt-5 text-lg">
              Payment Summary
            </Text>
            <View className="flex-row items-center mb-1 justify-between">
              <Text className="font-sLight text-base">Price</Text>
              <Text className="font-sMedium text-base">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(price)}
              </Text>
            </View>
            <View className="flex-row items-center mb-1 justify-between">
              <Text className="font-sLight text-base">Delivery Fee</Text>
              <View className="items-center justify-center gap-1 flex-row">
                <Text className="font-sRegular line-through text-gray-400 text-base">
                  (
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(2)}
                  )
                </Text>
                <Text className="font-sMedium  text-base">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(fee)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isopen ? (
          <View className="w-full bg-white py-4 px-6 rounded-t-3xl ">
            <View className=" flex-row items-center justify-between ">
              <View className="flex-row gap-2 items-center">
                <Image
                  source={icons.wallet}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor={"#C67C4E"}
                ></Image>
                <View className="gap-1">
                  <Text className="text-lg font-sMedium">Cash/Wallet</Text>
                  <Text className="text-primary text-base font-sRegular">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalPrice)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className=""
                activeOpacity={0.7}
                onPress={() => {
                  setIsopen(false);
                }}
              >
                <Image
                  className="h-5 w-5"
                  source={icons.down}
                  resizeMode="contain"
                ></Image>
              </TouchableOpacity>
            </View>

            <CustomButton
              text="Order"
              width="[90%]"
              height="auto"
              containerStyles="py-3 mt-4"
              callback={async () => {
                setIsOrdering(true);
                const cartString = JSON.stringify(cart)
                  .replace("[", "")
                  .replace("]", "");
                const userId = user.$id;

                await OrderCart(
                  userId,
                  [cartString],
                  adress,
                  price,
                  fee,
                  username
                );

                setIsOrdering(false);
                dispatch(clearCart());
                toast.show("Ordred Successfully", { type: "success" });
              }}
            ></CustomButton>
          </View>
        ) : (
          <View className="w-full justify-between items-center flex-row bg-white py-4 px-6 rounded-t-3xl ">
            <Text className="text-primary text-lg font-sSemiBold">
              {isOrdering ? "Ordering" : "Order Now"}
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => setIsopen(true)}
              activeOpacity={0.7}
            >
              <Image
                source={icons.up}
                className="w-4 h-4"
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default cart;
