import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
//no chng
import { AuthContext } from "../../Context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-web";
import { router } from "expo-router";
import axios from "axios";
import AllProduct from "./../AllProduct";
import API_URL from "../../config";

const home = () => {
  //no chng
  const { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const BANNER_WIDTH= screenWidth*0.9;
  const MARGIN=16;

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === "") {
      setFilteredProducts([]); // Reset to show all products
      return;
    }
  
    const filtered = featuredProducts.filter((product) => {
      const searchText = text.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.category.primary.toLowerCase().includes(searchText) ||
        product.category.sub.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText)
      );
    });
  
    setFilteredProducts(filtered);
  };

  const banners = [
    {
      id: 1,
      image: "https://www.shutterstock.com/image-vector/flash-sale-shopping-poster-banner-600nw-2410266013.jpg",
      title: "Special Offer",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-vector/watercolor-horizontal-sale-banner-template-summertime_23-2150250692.jpg?t=st=1738435834~exp=1738439434~hmac=e4a4b269b9bbb03340ec45bd2b30045004ff4106c8369867028baeee18ad4179&w=1380",
      title: "New Arrivals",
    },
    {
      id: 3,
      image: "https://i.graphicmama.com/blog/wp-content/uploads/2019/11/08101220/tropical-summer-sale-banner.jpg", 
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
          // "https://fashion-delight.vercel.app/products"
          // "http://192.168.1.104:4000/products"
          `${API_URL}/products`
        );
        console.log(response.data);
        setFeaturedProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1  mt-10 mb-16">
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
                value={searchQuery}
                onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Banner Section */}
        <View >
        <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="px-4"
    decelerationRate={0.98}  // Add this for smoother deceleration
    pagingEnabled={true}     // Add this for snap-like behavior
    snapToInterval={BANNER_WIDTH + MARGIN}
    snapToAlignment="center"
    scrollEventThrottle={16}  // Add this for better scroll performance
  >
    {banners.map((banner) => (
      <TouchableOpacity
        key={banner.id}
        className="mr-4"
        onPress={() => {console.log(`Banner ${banner.id} pressed`);
      router.push("AllProduct");
      }}
      >
        <View className="relative">
          <Image
            source={{ uri: banner.image }}
            style={{
              width: BANNER_WIDTH,
              height: BANNER_WIDTH * 0.474,
            }}
            className="rounded-2xl"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
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
              onPress={() => router.push("/productPage")}
            >
              <View className="bg-red-100 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Ionicons name="flash-outline" size={24} color="#DC2626" />
              </View>
              <Text className="font-medium text-gray-800">Sample Page</Text>
              <Text className="text-gray-500 text-sm">ProductPage Sample </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
<View className="px-4 py-3">
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-xl font-bold text-gray-800">
      {searchQuery ? "Search Results" : "Featured Products"}
    </Text>
    {!searchQuery && (
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => router.push("/AllProduct")}
      >
        <Text className="text-blue-500 mr-1">View all</Text>
        <Ionicons name="chevron-forward" size={16} color="#2563EB" />
      </TouchableOpacity>
    )}
  </View>

  <View className="flex-row flex-wrap justify-between">
    {(searchQuery ? filteredProducts : featuredProducts).map((product) => (
      <TouchableOpacity
        key={product._id}
        className="bg-white rounded-2xl w-[48%] mb-4 shadow-sm overflow-hidden"
        onPress={() => router.push(`search/${product._id}`)}
      >
        <Image
          source={{ uri: product.variants[0].images[0].url }}
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
              ${product.price.amount}
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
    
    {searchQuery && filteredProducts.length === 0 && (
      <View className="w-full items-center justify-center py-8">
        <Text className="text-gray-500 text-lg">
          No products found matching "{searchQuery}"
        </Text>
      </View>
    )}
  </View>
</View>
      </ScrollView>

      {/* Filter Button */}
      {/* <View className="absolute bottom-6 right-4">
        <TouchableOpacity
          className="bg-black w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => console.log("Filter pressed")}
        >
          <Ionicons name="funnel-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default home;