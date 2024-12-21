import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
//no chng
import { AuthContext } from "../../Context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-web";
import { router } from "expo-router";

const home = () => {
  //no chng
  const { user } = useContext(AuthContext);

  const dummyProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "$999",
      image: "https://picsum.photos/200/300",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      price: "$1,199",
      image: "https://picsum.photos/200/301",
      rating: 4.7,
    },
    {
      id: 3,
      name: "MacBook Pro 14-inch",
      price: "$1,999",
      image: "https://picsum.photos/200/302",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Dell XPS 15 Laptop",
      price: "$1,799",
      image: "https://picsum.photos/200/303",
      rating: 4.6,
    },
    {
      id: 5,
      name: "iPad Pro 12.9-inch",
      price: "$1,099",
      image: "https://picsum.photos/200/304",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Google Pixel 7 Pro",
      price: "$899",
      image: "https://picsum.photos/200/305",
      rating: 4.5,
    },
    {
      id: 7,
      name: "Sony WH-1000XM5 Headphones",
      price: "$399",
      image: "https://picsum.photos/200/306",
      rating: 4.8,
    },
    {
      id: 8,
      name: "Apple Watch Series 8",
      price: "$399",
      image: "https://picsum.photos/200/307",
      rating: 4.6,
    },
    {
      id: 9,
      name: "Surface Laptop 5",
      price: "$1,299",
      image: "https://picsum.photos/200/308",
      rating: 4.4,
    },
    {
      id: 10,
      name: "Lenovo ThinkPad X1 Carbon",
      price: "$1,649",
      image: "https://picsum.photos/200/309",
      rating: 4.7,
    },
    {
      id: 11,
      name: "AirPods Pro (2nd Generation)",
      price: "$249",
      image: "https://picsum.photos/200/310",
      rating: 4.7,
    },
    {
      id: 12,
      name: "Samsung Galaxy Tab S8 Ultra",
      price: "$1,099",
      image: "https://picsum.photos/200/311",
      rating: 4.5,
    },
    {
      id: 13,
      name: "Bose QuietComfort 45",
      price: "$329",
      image: "https://picsum.photos/200/312",
      rating: 4.6,
    },
    {
      id: 14,
      name: "Garmin Fenix 7 Smartwatch",
      price: "$699",
      image: "https://picsum.photos/200/313",
      rating: 4.8,
    },
    {
      id: 15,
      name: "Razer Blade 15 Gaming Laptop",
      price: "$2,399",
      image: "https://picsum.photos/200/314",
      rating: 4.5,
    },
    {
      id: 16,
      name: "OnePlus 10 Pro",
      price: "$799",
      image: "https://picsum.photos/200/315",
      rating: 4.3,
    },
    {
      id: 17,
      name: "GoPro HERO11 Black",
      price: "$399",
      image: "https://picsum.photos/200/316",
      rating: 4.7,
    },
    {
      id: 18,
      name: "Beats Studio3 Wireless",
      price: "$349",
      image: "https://picsum.photos/200/317",
      rating: 4.4,
    },
    {
      id: 19,
      name: "Apple Mac Mini M2",
      price: "$599",
      image: "https://picsum.photos/200/318",
      rating: 4.6,
    },
    {
      id: 20,
      name: "Fitbit Sense 2",
      price: "$299",
      image: "https://picsum.photos/200/319",
      rating: 4.5,
    },
  ];
  const banners = [
    {
      id: 1,
      image: "https://picsum.photos/400/200",
      title: "Special Offer",
    },
    {
      id: 2,
      image: "https://picsum.photos/400/201",
      title: "New Arrivals",
    },
    {
      id: 3,
      image: "https://picsum.photos/400/202",
      title: "Limited Time Deal",
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-gray-50 mt-10 mb-16">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="px-4 pt-2 pb-4">
          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              placeholder="Search products..."
              className="flex-1 ml-2 text-base"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Banner Section */}
        <View className="py-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
            decelerationRate="fast"
            snapToInterval={380 + 16} // width + margin
            snapToAlignment="center"
          >
            {banners.map((banner) => (
              <TouchableOpacity
                key={banner.id}
                className="mr-4"
                onPress={() => console.log(`Banner ${banner.id} pressed`)}
              >
                <View className="relative">
                  <Image
                    source={{ uri: banner.image }}
                    className="w-[380px] h-[180px] rounded-2xl"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                  <View className="absolute bottom-4 left-4">
                    <Text className="text-white font-bold text-xl mb-1">
                      {banner.title}
                    </Text>
                    <TouchableOpacity className="bg-white backdrop-blur-md px-4 py-2 rounded-full">
                      <Text className="text-black font-medium">Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="px-4 py-3">
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-white flex-1 mr-2 p-4 rounded-2xl shadow-sm"
              onPress={() => router.push("/category")}
            >
              <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="grid-outline" size={24} color="#2563EB" />
              </View>
              <Text className="font-medium text-gray-800">Categories</Text>
              <Text className="text-gray-500 text-sm">Browse all</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white flex-1 ml-2 p-4 rounded-2xl shadow-sm"
              onPress={() => router.push("/deals")}
            >
              <View className="bg-red-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="flash-outline" size={24} color="#DC2626" />
              </View>
              <Text className="font-medium text-gray-800">Hot Deals</Text>
              <Text className="text-gray-500 text-sm">Special offers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        <View className="px-4 py-3">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Featured Products
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-500 mr-1">View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {dummyProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white rounded-2xl w-[48%] mb-4 shadow-sm overflow-hidden"
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-40 rounded-t-2xl"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text
                    className="font-medium text-gray-800 mb-1"
                    numberOfLines={2}
                  >
                    {product.name}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-green-500 font-bold text-lg">
                      {product.price}
                    </Text>
                    <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text className="text-gray-700 text-sm ml-1 font-medium">
                        {product.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Button */}
      <View className="absolute bottom-6 right-4">
        <TouchableOpacity
          className="bg-black w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => console.log("Filter pressed")}
        >
          <Ionicons name="funnel-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;
