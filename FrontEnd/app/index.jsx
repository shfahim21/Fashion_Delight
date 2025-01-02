import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading or initialization process
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/home"); // Navigate to the /home route after loading
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <View className="flex justify-center items-center">
          <Text className="text-white text-3xl font-bold mb-4">
            Fashion Delight
          </Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </SafeAreaView>
    );
  }

  return null; // Prevent rendering anything else during navigation
}
