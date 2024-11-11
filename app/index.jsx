import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white">
        Open up App.js to start working on your app!
      </Text>
      <Link href="/profile">Go to profile</Link>
      <StatusBar style="auto" />
    </View>
  );
}
