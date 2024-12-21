import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Category = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: "phone-portrait",
      items: "245",
      color: ["#4F46E5", "#7C3AED"],
    },
    {
      id: 2,
      name: "Fashion",
      icon: "shirt",
      items: "156",
      color: ["#F59E0B", "#EF4444"],
    },
    {
      id: 3,
      name: "Home",
      icon: "home",
      items: "198",
      color: ["#10B981", "#059669"],
    },
    {
      id: 4,
      name: "Sports",
      icon: "basketball",
      items: "123",
      color: ["#3B82F6", "#2563EB"],
    },
    {
      id: 5,
      name: "Beauty",
      icon: "sparkles",
      items: "312",
      color: ["#EC4899", "#DB2777"],
    },
    {
      id: 6,
      name: "Books",
      icon: "book",
      items: "245",
      color: ["#8B5CF6", "#6D28D9"],
    },
    {
      id: 7,
      name: "Toys",
      icon: "game-controller",
      items: "176",
      color: ["#F97316", "#EA580C"],
    },
    {
      id: 8,
      name: "Automotive",
      icon: "car-sport",
      items: "198",
      color: ["#64748B", "#475569"],
    },
  ];

  const CategoryCard = ({ name, icon, items, color }) => (
    <TouchableOpacity className="w-[48%] mb-4">
      <LinearGradient
        colors={color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-4 h-44"
      >
        <View className="flex-1 justify-between">
          <View className="bg-white/20 self-start p-3 rounded-full">
            <Ionicons name={icon} size={24} color="white" />
          </View>

          <View>
            <Text className="text-white text-lg font-bold mb-1">{name}</Text>
            <View className="flex-row items-center">
              <Text className="text-white/80 text-sm">{items} Products</Text>
              <View className="flex-row items-center ml-auto">
                <Text className="text-white mr-1">View</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const FeaturedCategory = () => (
    <TouchableOpacity className="mb-4">
      <ImageBackground
        source={{ uri: "https://picsum.photos/800/300" }}
        className="h-40 rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="flex-1 justify-end p-4"
        >
          <Text className="text-white text-2xl font-bold mb-1">
            Summer Sale
          </Text>
          <Text className="text-white/80 mb-2">
            Up to 50% off on selected items
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="font-semibold">Shop Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 pt-12 mb-10">
        {/* Header */}
        <View className="px-4 mb-4">
          <Text className="text-3xl font-bold text-gray-800">Categories</Text>
          {/* <Text className="text-gray-500 mt-1">Find everything you need</Text> */}
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center bg-white px-4 py-3 rounded-xl shadow-sm">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search categories"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-base"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        {/* Featured Category */}
        <View className="px-4">
          <FeaturedCategory />
        </View>

        {/* Categories Grid */}
        <View className="px-4 pb-20">
          <View className="flex-row justify-between flex-wrap">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
