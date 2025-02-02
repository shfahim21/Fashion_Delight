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
import { Link, router } from "expo-router";
import axios from "axios";
import API_URL from "../../config";

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

  // const userToStore = {
  //   name: formData.fullName,
  //   email: formData.email,
  //   phone: null,
  //   profilePicture: "https://picsum.photos/200",
  //   dateOfBirth: null,
  //   address: [
  //     {
  //       street: null,
  //       city: null,
  //       zip: null,
  //     },
  //   ],
  //   wishlist: [],
  //   cart: [],
  //   role: "customer",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // };

  // const userToStore = {
  //   name: formData.fullName,
  //   email: formData.email,
  //   password: formData.password, // You might want to hash this
  //   phone: {
  //     number: null,
  //     countryCode: null
  //   },
  //   profilePicture: "https://picsum.photos/200",
  //   dateOfBirth: null,
  //   address: [],
  //   wishlist: [],
  //   cart: [],
  //   role: "customer",
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // };



  const userToStore = {
    name: formData.fullName,
    email: formData.email,
    password: formData.password,
    phone: {
      number: String(Math.floor(Math.random() * 10000000000)).padStart(10, '0'),  // Generate random phone number
      countryCode: "+1"
    },
    profilePicture: "https://example.com/profiles/default.jpg",
    dateOfBirth: null,
    address: [],
    wishlist: [],
    cart: [],
    role: "customer",
    createdAt: {
      $date: new Date().toISOString()
    },
    updatedAt: {
      $date: new Date().toISOString()
    }
  };

  // const handleSignUp = async () => {
  //   // Basic validation
  //   if (
  //     !formData.fullName ||
  //     !formData.email ||
  //     !formData.password ||
  //     !formData.confirmPassword
  //   ) {
  //     Alert.alert("Error", "Please fill in all fields.");
  //     return;
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     Alert.alert("Error", "Passwords do not match.");
  //     return;
  //   }

  //   if (formData.password.length < 4) {
  //     Alert.alert("Error", "Password must be at least 4 characters long.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     // Sign up logic
  //     await userSignUp(formData.email, formData.password);
  //     // create a database entry for the user
  //     axios
  //       .post("http://192.168.1.104:4000/users/", userToStore)
  //       .then((response) => {
  //         console.log("User created successfully:", response.data);
  //       });
  //     router.push("/home");
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  const handleSignUp = async () => {
    try {
      setLoading(true);
  
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
  
      if (formData.password !== formData.confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
  
      if (formData.password.length < 4) {
        Alert.alert("Error", "Password must be at least 4 characters long.");
        return;
      }
  
      // First create the authentication user
      await userSignUp(formData.email, formData.password);
  
      // Then create the user in your database
      console.log('Sending user data:', JSON.stringify(userToStore, null, 2));
      
      const response = await axios.post(
        `${API_URL}/users`, 
        userToStore,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Server response:', response.data);
  
      if (response.data.success) {
        console.log("User created successfully:", response.data);
        router.push("/home");
      } else {
        throw new Error("Failed to create user in database");
      }
  
    } catch (error) {
      console.error("Signup error:", error);
      
      // More detailed error handling
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to create account";
      
      // Log the full error details
      if (error.response?.data) {
        console.error("Server error details:", error.response.data);
      }
      
      Alert.alert("Error", errorMessage);
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
          <View className="items-center mt-6">
            <Text className="text-3xl font-bold text-gray-900">
              Create Account
            </Text>
            <Text className="text-base text-gray-600 mt-2">
              Join us and start shopping
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-10">
            {/* Full Name Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 mb-4 bg-white">
              <Icon name="person-outline" size={20} color="#6B7280" />
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
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 mb-4 bg-white">
              <Icon name="mail-outline" size={20} color="#6B7280" />
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
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 mb-4 bg-white">
              <Icon name="lock-closed-outline" size={20} color="#6B7280" />
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
                className="p-2"
              >
                <Icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12 bg-white">
              <Icon name="lock-closed-outline" size={20} color="#6B7280" />
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
                className="p-2"
              >
                <Icon
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <Text className="text-sm text-gray-600 text-center mt-4">
              By signing up, you agree to our{" "}
              <Text className="text-blue-500">Terms of Service</Text> and{" "}
              <Text className="text-blue-500">Privacy Policy</Text>.
            </Text>

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`h-12 rounded-lg items-center justify-center mt-6 ${
                loading ? "bg-gray-400" : "bg-gray-900"
              }`}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            {/* Social Sign Up */}
            {/* <View className="items-center mt-8">
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
            </View> */}

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-600 text-sm">
                Already have an account?{" "}
              </Text>
              <Link
                href="/sign-in"
                className="text-blue-500 text-sm font-semibold"
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
