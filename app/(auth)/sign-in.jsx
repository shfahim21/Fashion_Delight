import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Add your authentication logic here
      // Example: await auth.signInWithEmailAndPassword(email, password);

      // Navigate to main app after successful sign in
      // navigation.replace('MainApp');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white min-h-[84vh] mt-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6">
          {/* Logo Section */}
          <View className="items-center mt-10">
            <Image
              source={require("../../assets/logo.png.png")}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View className="items-center mt-8">
            <Text className="text-2xl font-bold text-gray-800">
              Welcome Back!
            </Text>
            <Text className="text-base text-gray-600 mt-2">
              Sign in to continue shopping
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-8">
            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12 mb-4">
              <Icon name="mail-outline" size={20} className="text-gray-500" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12">
              <Icon
                name="lock-closed-outline"
                size={20}
                className="text-gray-500"
              />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
              >
                <Icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  className="text-gray-500"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              className="items-end mt-3"
            >
              <Text className="text-sm text-third">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              className={`h-12 rounded-full items-center justify-center mt-6 ${
                loading ? "bg-fourth" : "bg-black"
              }`}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text className="text-white text-base font-semibold">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Social Sign In */}
            <View className="items-center mt-8">
              <Text className="text-gray-500 text-sm mb-4">OR</Text>
              <View className="flex-row justify-center space-x-6">
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center">
                  <Icon name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center">
                  <Icon name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center">
                  <Icon name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-6 mb-8">
              <Text className="text-gray-600 text-sm">
                Don't have an account?{" "}
              </Text>
              <Link href="/sign-up" className="text-second-200 font-semibold">
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
