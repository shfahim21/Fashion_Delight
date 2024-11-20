import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

const Profile = () => {
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
      {/* <Text className="text-third text-lg">›</Text> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header Section */}
        <View className="bg-white p-6 items-center">
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
            {userInfo.name}
          </Text>
          <Text className="text-gray-500">{userInfo.email}</Text>
        </View>

        {/* Stats Section */}
        <View className="bg-white mt-2 py-4">
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

        {/* Menu Section */}
        <View className="bg-white mt-2">
          {menuItems.map((item) => (
            <MenuItem key={item.id} title={item.title} icon={item.icon} />
          ))}
        </View>

        {/* Logout Button */}
        <View className="p-4">
          <TouchableOpacity
            className="w-full bg-red-500 py-3 rounded-lg items-center"
            onPress={() => console.log("Logout pressed")}
          >
            <Text className="text-white font-medium">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
