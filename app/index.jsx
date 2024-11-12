import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white space-y-4">
      <Text className="text-white text-2xl">Finally</Text>
      <Link
        href="sign-in"  
        className="text-white p-4 bg-black rounded-full font-semibold w-48 text-center"
      >
        Sign In
      </Link>

      <Link
        href="sign-up"  
        className="text-white p-4 bg-black rounded-full font-semibold w-48 text-center"
      >
        Sign Up
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
