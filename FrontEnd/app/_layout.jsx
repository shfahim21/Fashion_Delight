import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Profile from "./(tabs)/profile";
import AuthProvider from "../Context/AuthProvider";
import AllProduct from "./AllProduct";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        {/* screen names doesn't matter */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="productPage" options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfile" options={{ headerShown: false }} />
        <Stack.Screen name="UpdateAddress" options={{ headerShown: false }} />
        <Stack.Screen name="AllProduct" options={{ headerShown: false }} />
        <Stack.Screen name="Wishlist" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
