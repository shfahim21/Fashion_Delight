import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import AllProduct from "./../AllProduct";

const home = () => {
  //no chng
  const { user } = useContext(AuthContext);

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

  demo_object = {
    id: "TS-12345",
    sku: "BLK-TSHIRT-M-001",
    name: "Classic Cotton Crew Neck T-Shirt",
    brand: "ComfortWear",
    description:
      "Premium quality cotton t-shirt featuring a comfortable crew neck and short sleeves. Perfect for everyday wear.",
    price: {
      amount: 29.99,
      currency: "USD",
    },
    discount: {
      percentage: 0,
      amount: 0,
      validUntil: null,
    },
    category: {
      primary: "Clothing",
      sub: "T-Shirts",
    },
    attributes: {
      material: "100% Cotton",
      weight: "180g/m²",
      care: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    },
    variants: [
      {
        id: "TS-12345-BLK-S",
        color: "Black",
        size: "S",
        stockQuantity: 45,
        images: [
          {
            url: "/images/products/ts-12345-blk-front.jpg",
            alt: "Black T-Shirt Front View",
            isPrimary: true,
          },
          {
            url: "/images/products/ts-12345-blk-back.jpg",
            alt: "Black T-Shirt Back View",
            isPrimary: false,
          },
        ],
      },
    ],
    metadata: {
      createdAt: "2024-12-31T10:00:00Z",
      updatedAt: "2024-12-31T10:00:00Z",
      isPublished: true,
      tags: ["essentials", "basics", "summer"],
      ratings: {
        average: 4.5,
        count: 128,
      },
    },
    shipping: {
      weight: 200,
      dimensions: {
        length: 25,
        width: 20,
        height: 2,
        unit: "cm",
      },
      freeShipping: true,
      estimatedDelivery: "2-4 business days",
    },
    seo: {
      metaTitle: "Classic Cotton Crew Neck T-Shirt | ComfortWear",
      metaDescription:
        "Shop our premium cotton t-shirt with comfortable crew neck. Available in multiple sizes and colors. Perfect for everyday wear.",
      keywords: [
        "cotton t-shirt",
        "crew neck",
        "casual wear",
        "comfortable clothing",
      ],
    },
  };
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "https://fd-backend-peach.vercel.app/products"
        );
        setFeaturedProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => router.push("/AllProduct")}
            >
              <Text className="text-blue-500 mr-1">View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product._id}
                className="bg-white rounded-2xl w-[48%] mb-4 shadow-sm overflow-hidden"
                onPress={() => router.push(`search/${product._id}`)}
              >
                <Image
                  // source={{ uri: product.variants[0].images[0].url }}
                  source={{ uri: "https://via.placeholder.com/150" }}
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
                      {product.price.amount}
                    </Text>
                    <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text className="text-gray-700 text-sm ml-1 font-medium">
                        {product.metadata.ratings.average}
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
