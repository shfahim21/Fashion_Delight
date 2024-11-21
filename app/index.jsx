import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//hyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white space-y-4">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full">
          <Text className="text-white text-2xl">Finally</Text>
          <Link
            href="/(auth)/sign-in"
            className="text-white p-4 bg-black rounded-full font-semibold w-48 text-center mb-4"
          >
            Sign In
          </Link>

          <Link
            href="(auth)/sign-up"
            className="text-white p-4 bg-black rounded-full font-semibold w-48 text-center mb-4"
          >
            Sign Up
          </Link>

          <Link
            href="/home"
            className="text-white p-4 bg-black rounded-full font-semibold w-48 text-center mb-4"
          >
            Go to home
          </Link>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
