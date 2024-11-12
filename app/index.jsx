import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-2xl">Finally</Text>
      <Link
        href="sign-in"  
        className="text-black p-4 bg-white rounded-full font-semibold"
      >
        Go to home
      </Link>

      <Link
        href="sign-up"  
        className="text-black p-4 bg-white rounded-full font-semibold"
      >
        Go to sign up
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
