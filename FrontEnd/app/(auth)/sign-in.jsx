// Import statements
import React, { useContext, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "expo-router";

const SignInScreen = ({ navigation }) => {
  const { setUser, userSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await userSignIn(email, password);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          className="px-6"
        >
          {/* Logo Section */}
          <View className="items-center mt-8">
            <Image
              source={require("../../assets/logo.png.png")}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View className="items-center mt-8">
            <Text className="text-3xl font-bold text-gray-900">
              Welcome Back!
            </Text>
            <Text className="text-base text-gray-600 mt-2">
              Sign in to continue shopping
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-10">
            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 mb-4 bg-white">
              <Icon name="mail-outline" size={20} color="#6B7280" />
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
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 bg-white">
              <Icon name="lock-closed-outline" size={20} color="#6B7280" />
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
                className="p-2"
              >
                <Icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              className="items-end mt-2"
            >
              <Text className="text-sm text-blue-500">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              className={`h-12 rounded-lg items-center justify-center mt-6 ${
                loading ? "bg-gray-400" : "bg-gray-900"
              }`}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Social Sign In */}
            <View className="items-center mt-10">
              <Text className="text-gray-500 text-sm mb-4">OR</Text>
              <View className="flex-row justify-center space-x-6">
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center bg-white">
                  <Icon name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center bg-white">
                  <Icon name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 border border-gray-300 rounded-full items-center justify-center bg-white">
                  <Icon name="logo-apple" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-600 text-sm">
                Don't have an account?{" "}
              </Text>
              <Link href="/sign-up" className="text-blue-500 font-semibold">
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
