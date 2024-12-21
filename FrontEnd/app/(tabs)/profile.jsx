import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { user, userSignOut } = useContext(AuthContext);

  // Sample user data
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "2023",
    orders: 12,
  };

  const menuItems = [
    { id: 1, title: "My Orders", icon: "📦" },
    { id: 2, title: "Shipping Addresses", icon: "🏠" },
    { id: 3, title: "Payment Methods", icon: "💳" },
    { id: 4, title: "Wishlist", icon: "❤️" },
    { id: 5, title: "Settings", icon: "⚙️" },
    { id: 6, title: "Help & Support", icon: "❓" },
  ];

  const MenuItem = ({ title, icon }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-gray-100"
      onPress={() => console.log(`${title} pressed`)}
    >
      <Text className="text-xl mr-3">{icon}</Text>
      <Text className="flex-1 text-gray-700">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 min-h-[84vh] mt-10">
      {/* <StatusBar backgroundColor="#FFFFFF" /> */}
      <ScrollView>
        {/* Top Container: Action Bar, Header, and Stats */}
        <View className="bg-white mb-4 py-1 mx-4 rounded-xl">
          {/* Action Bar */}
          <View className="py-2 px-4 flex-row justify-between items-center border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">Profile</Text>
            <TouchableOpacity
              className={`bg-red-600 py-2 px-4 rounded-full ${
                user ? "" : "hidden"
              }`}
              onPress={userSignOut}
            >
              <Text className="text-white font-semibold">Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-black py-2 px-4 rounded-full ${
                user ? "hidden" : ""
              }`}
            >
              <Link href="/(auth)/sign-in" className="text-white font-semibold">
                Login
              </Link>
            </TouchableOpacity>
          </View>

          {/* Header Section */}
          <View className="p-6 items-center">
            <View className="relative mb-4">
              <View className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  source={{ uri: "https://via.placeholder.com/96" }}
                  className="w-24 h-24"
                />
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-blue-500 px-3 py-1 rounded-full"
                onPress={() => console.log("Edit pressed")}
              >
                <Text className="text-white text-sm">Edit</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {user?.email || "UserName"}
            </Text>
            <Text className="text-gray-500">{userInfo.email}</Text>
          </View>

          {/* Stats Section */}
          <View className="py-4 border-t border-gray-100">
            <View className="flex-row justify-center items-center">
              <View className="items-center px-8">
                <Text className="text-xl font-semibold text-gray-800">
                  {userInfo.orders}
                </Text>
                <Text className="text-sm text-gray-500">Orders</Text>
              </View>
              <View className="h-12 w-px bg-gray-200 mx-4" />
              <View className="items-center px-8">
                <Text className="text-xl font-semibold text-gray-800">
                  {userInfo.memberSince}
                </Text>
                <Text className="text-sm text-gray-500">Member Since</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Container: Menu Section */}
        <View className="bg-white rounded-xl shadow-sm mx-4">
          <View className="py-2">
            <Text className="px-4 py-2 text-gray-500 text-sm">MENU</Text>
            {menuItems.map((item) => (
              <MenuItem key={item.id} title={item.title} icon={item.icon} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
