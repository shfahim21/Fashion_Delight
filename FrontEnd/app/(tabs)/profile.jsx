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
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UpdateProfile from "./../UpdateProfile";
import UpdateAddress from "./../UpdateAddress";
import Wishlist from "./../Wishlist";

const Profile = () => {
  const { user, userSignOut } = useContext(AuthContext);

  const userInfo = {
    name: "John Doe",
    email: "user@email.com",
    memberSince: "2023",
    orders: 12,
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          id: 1,
          title: "Edit Profile",
          subtitle: "Update your personal information",
          icon: "person-outline",
          color: "#2563EB",
          bgColor: "bg-blue-100",
          route: "/UpdateProfile",
        },
        {
          id: 2,
          title: "Shipping Addresses",
          subtitle: "Manage delivery locations",
          icon: "location-outline",
          color: "#059669",
          bgColor: "bg-green-100",
          route: "/UpdateAddress",
        },
        {
          id: 3,
          title: "Payment Methods",
          subtitle: "Manage your payment options",
          icon: "card-outline",
          color: "#7C3AED",
          bgColor: "bg-purple-100",
          // route: "/payment-methods",
          route: "/Clothing",
        },
      ],
    },
    {
      title: "Shopping",
      items: [
        {
          id: 4,
          title: "My Orders",
          subtitle: "Track and manage orders",
          icon: "cube-outline",
          color: "#EA580C",
          bgColor: "bg-orange-100",
          route: "/orders",
        },
        {
          id: 5,
          title: "Wishlist",
          subtitle: "Products you've saved",
          icon: "heart-outline",
          color: "#DC2626",
          bgColor: "bg-red-100",
          route: "/Wishlist",
        },
      ],
    },
    // {
    //   title: "Support",
    //   items: [
    //     {
    //       id: 6,
    //       title: "Help Center",
    //       subtitle: "Get help and support",
    //       icon: "help-circle-outline",
    //       color: "#0891B2",
    //       bgColor: "bg-cyan-100",
    //       route: "/help",
    //     },
    //     {
    //       id: 7,
    //       title: "Settings",
    //       subtitle: "App preferences",
    //       icon: "settings-outline",
    //       color: "#4B5563",
    //       bgColor: "bg-gray-100",
    //       route: "/settings",
    //     },
    //   ],
    // },
  ];

  const MenuItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 mb-2 bg-white rounded-xl shadow-sm"
      onPress={() => router.push(item.route)}
    >
      <View className={`${item.bgColor} p-2 rounded-full`}>
        <Ionicons name={item.icon} size={20} color={item.color} />
      </View>
      <View className="flex-1 ml-3">
        <Text className="font-medium text-gray-800">{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#374151" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 pt-10">
        {/* Header Section */}
        <View className="px-4 mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">Profile</Text>
            <TouchableOpacity
              className={`${
                user ? "bg-red-500" : "bg-black"
              } py-2 px-4 rounded-full`}
              onPress={user ? userSignOut : null}
            >
              {user ? (
                <Text className="text-white font-semibold">Logout</Text>
              ) : (
                <Link
                  href="/(auth)/sign-in"
                  className="text-white font-semibold"
                >
                  Login
                </Link>
              )}
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View className="bg-white p-4 rounded-2xl shadow-sm">
            <View className="flex-row items-center">
              <View className="relative">
                <Image
                  source={{ uri: "https://picsum.photos/200" }}
                  className="w-20 h-20 rounded-full"
                />
                <TouchableOpacity
                  className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full"
                  onPress={() => console.log("Edit photo")}
                >
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-xl font-bold text-gray-800">
                  {user?.email || "Guest User"}
                </Text>
                <Text className="text-gray-500">{userInfo.email}</Text>
                <View className="flex-row mt-2">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="cube-outline" size={16} color="#4B5563" />
                    <Text className="ml-1 text-gray-600">
                      {userInfo.orders} Orders
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#4B5563"
                    />
                    <Text className="ml-1 text-gray-600">
                      Since {userInfo.memberSince}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, index) => (
          <View key={index} className="px-4 mb-6">
            <Text className="text-gray-600 font-medium mb-3">
              {section.title}
            </Text>
            {section.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
