import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Category = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 1, name: "T-Shirts", icon: "shirt", items: "245" },
    { id: 2, name: "Pants", icon: "footsteps", items: "156" },
    { id: 3, name: "Dresses", icon: "woman", items: "198" },
    { id: 4, name: "Jackets", icon: "watch", items: "123" },
    { id: 5, name: "Shoes", icon: "footsteps", items: "312" },
    { id: 6, name: "Accessories", icon: "watch", items: "245" },
    { id: 7, name: "Sports", icon: "basketball", items: "176" },
    { id: 8, name: "Kids", icon: "people", items: "198" },
  ];

  const popularCategories = [
    {
      id: 1,
      name: "Summer Collection",
      image: "https://via.placeholder.com/150",
      items: "1.2k",
    },
    {
      id: 2,
      name: "Winter Wear",
      image: "https://via.placeholder.com/150",
      items: "876",
    },
    {
      id: 3,
      name: "New Arrivals",
      image: "https://via.placeholder.com/150",
      items: "543",
    },
  ];

  const CategoryCard = ({ name, icon, items }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 flex-1 m-1 items-center justify-center shadow-sm"
      style={{ minWidth: "45%" }}
    >
      <View className="bg-gray-50 p-3 rounded-full mb-2">
        <Ionicons name={icon} size={24} color="#007AFF" />
      </View>
      <Text className="font-semibold text-gray-800 mb-1">{name}</Text>
      <Text className="text-gray-500 text-sm">{items} items</Text>
    </TouchableOpacity>
  );

  const PopularCategoryCard = ({ name, image, items }) => (
    <TouchableOpacity className="mr-4 w-40">
      <View className="bg-white rounded-xl overflow-hidden shadow-sm">
        <Image
          source={{ uri: image }}
          className="w-full h-24"
          resizeMode="cover"
        />
        <View className="p-2">
          <Text className="font-medium text-gray-800">{name}</Text>
          <Text className="text-gray-500 text-xs">{items} items</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-3 bg-white">
        <Text className="text-2xl font-bold text-gray-800">Categories</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 bg-white">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-xl">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search categories"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-gray-800"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Popular Categories */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Popular Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularCategories.map((category) => (
              <PopularCategoryCard key={category.id} {...category} />
            ))}
          </ScrollView>
        </View>

        {/* All Categories Grid */}
        <View className="mt-4 px-4 pb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            All Categories
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Button - Fixed at bottom */}
      <View className="absolute bottom-4 right-4">
        <TouchableOpacity
          className="bg-black w-12 h-12 rounded-full items-center justify-center shadow-lg"
          onPress={() => console.log("Filter pressed")}
        >
          <Ionicons name="funnel" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Category;
