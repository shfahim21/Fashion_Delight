import { Link } from "expo-router";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../Context/AuthProvider";

const SignUpScreen = ({ navigation }) => {
  const { userSignUp, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      // Add your sign up logic here
      // Example: await auth.createUserWithEmailAndPassword(email, password);
      userSignUp(formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      // Navigate to main app after successful sign up
      // navigation.replace('MainApp');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white min-h-[100vh] pt-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6">
          {/* Logo Section */}
          <View className="items-center mt-8">
            <Image
              source={require("../../assets/logo.png.png")}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <View className="items-center mt-6">
            <Text className="text-2xl font-bold text-gray-800">
              Create Account
            </Text>
            <Text className="text-base text-gray-600 mt-2">
              Join us and start shopping
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-8">
            {/* Full Name Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12 mb-4">
              <Icon name="person-outline" size={20} className="text-gray-500" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
                autoCapitalize="words"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12 mb-4">
              <Icon name="mail-outline" size={20} className="text-gray-500" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12 mb-4">
              <Icon
                name="lock-closed-outline"
                size={20}
                className="text-gray-500"
              />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
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

            {/* Confirm Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-full px-4 h-12 mb-4">
              <Icon
                name="lock-closed-outline"
                size={20}
                className="text-gray-500"
              />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1"
              >
                <Icon
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  className="text-gray-500"
                />
              </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <Text className="text-sm text-gray-600 text-center mt-2">
              By signing up, you agree to our{" "}
              <Text className="text-green-500">Terms of Service</Text> and{" "}
              <Text className="text-green-500">Privacy Policy</Text>
            </Text>

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`h-12 rounded-full items-center justify-center mt-6 ${
                loading ? "bg-fourth" : "bg-black"
              }`}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text className="text-white text-base font-semibold">
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Social Sign Up */}
            <View className="items-center mt-6">
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

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-6 mb-8">
              <Text className="text-gray-600 text-sm">
                Already have an account?{" "}
              </Text>
              <Link
                href="/sign-in"
                className="text-green-500 text-sm font-semibold"
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
