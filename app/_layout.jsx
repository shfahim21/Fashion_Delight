import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Profile from "./(tabs)/profile";

const RootLayout = () => {
  return (
    <Stack>
      {/* screen names doesn't matter */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="sign-up" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
