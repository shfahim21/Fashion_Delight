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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Search Bar */}
        <View className="px-4 py-3">
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              placeholder="Search products..."
              className="flex-1 ml-2"
              placeholderTextColor="#666"
            />
          </View>
        </View>
        {/* Categories Grid
        <View className="px-4 py-3">
          <Text className="text-lg font-bold mb-3">Categories</Text>
          <View className="flex-row flex-wrap">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </View>
        </View> */}
        {/* Popular Categories */}
        {/* <View className="py-3">
          <Text className="text-lg font-bold px-4 mb-3">
            Popular Categories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {popularCategories.map((category, index) => (
              <PopularCategoryCard key={index} {...category} />
            ))}
          </ScrollView>
        </View> */}
        {/* Featured Products */}
        <View className="px-4 py-3">
          <Text className="text-lg font-bold mb-3">Featured Products</Text>
          <View className="flex-row flex-wrap justify-between">
            {dummyProducts.map((product) => (
              <View
                key={product.id}
                className="bg-white rounded-xl w-[48%] mb-4 shadow-sm"
              >
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-32 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="font-medium text-gray-800">
                    {product.name}
                  </Text>
                  <Text className="text-green-500 font-bold">
                    {product.price}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons name="star" size={16} color="#FFD800" />
                    <Text className="text-gray-600 text-sm ml-1">
                      {product.rating}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Button - Fixed at bottom */}
      <View className="absolute bottom-20 right-2">
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

export default home;
