import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TrendingProducts = () => {
  const [viewMode, setViewMode] = useState("card");
  const trendingProducts = [
    {
      id: 1,
      name: "Nike Air Max 2024",
      price: "$199",
      description: "Latest trending sneakers",
      image: "https://picsum.photos/400/600",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: "$299",
      description: "Premium smartwatch with health tracking",
      image: "https://picsum.photos/400/601",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: "$159",
      description: "High-quality sound experience",
      image: "https://picsum.photos/400/602",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$89",
      description: "Portable speaker with powerful bass",
      image: "https://picsum.photos/400/603",
      rating: 4.5,
    },
    {
      id: 5,
      name: "4K Smart TV",
      price: "$599",
      description: "Ultra HD experience with smart features",
      image: "https://picsum.photos/400/604",
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Laptop 15" Pro',
      price: "$999",
      description: "High-performance laptop for work and play",
      image: "https://picsum.photos/400/605",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Gaming Headset",
      price: "$129",
      description: "Immersive sound and comfortable design",
      image: "https://picsum.photos/400/606",
      rating: 4.8,
    },
    {
      id: 8,
      name: "Smartphone X Plus",
      price: "$799",
      description: "Flagship smartphone with advanced features",
      image: "https://picsum.photos/400/607",
      rating: 4.7,
    },
    {
      id: 9,
      name: "Portable Power Bank",
      price: "$49",
      description: "Fast charging power bank for all devices",
      image: "https://picsum.photos/400/608",
      rating: 4.6,
    },
    {
      id: 10,
      name: "Drone Xtreme",
      price: "$399",
      description: "High-definition camera drone for aerial shots",
      image: "https://picsum.photos/400/609",
      rating: 4.7,
    },
    {
      id: 11,
      name: "Nike Air Max 2024",
      price: "$199",
      description: "Latest trending sneakers",
      image: "https://picsum.photos/400/600",
      rating: 4.8,
    },
    {
      id: 12,
      name: "Smart Watch Pro",
      price: "$299",
      description: "Premium smartwatch with health tracking",
      image: "https://picsum.photos/400/601",
      rating: 4.9,
    },
    {
      id: 13,
      name: "Wireless Earbuds",
      price: "$159",
      description: "High-quality sound experience",
      image: "https://picsum.photos/400/602",
      rating: 4.7,
    },
    {
      id: 14,
      name: "Bluetooth Speaker",
      price: "$89",
      description: "Portable speaker with powerful bass",
      image: "https://picsum.photos/400/603",
      rating: 4.5,
    },
    {
      id: 15,
      name: "4K Smart TV",
      price: "$599",
      description: "Ultra HD experience with smart features",
      image: "https://picsum.photos/400/604",
      rating: 4.6,
    },
    {
      id: 16,
      name: 'Laptop 15" Pro',
      price: "$999",
      description: "High-performance laptop for work and play",
      image: "https://picsum.photos/400/605",
      rating: 4.4,
    },
    {
      id: 17,
      name: "Gaming Headset",
      price: "$129",
      description: "Immersive sound and comfortable design",
      image: "https://picsum.photos/400/606",
      rating: 4.8,
    },
    {
      id: 18,
      name: "Smartphone X Plus",
      price: "$799",
      description: "Flagship smartphone with advanced features",
      image: "https://picsum.photos/400/607",
      rating: 4.7,
    },
    {
      id: 19,
      name: "Portable Power Bank",
      price: "$49",
      description: "Fast charging power bank for all devices",
      image: "https://picsum.photos/400/608",
      rating: 4.6,
    },
    {
      id: 20,
      name: "Drone Xtreme",
      price: "$399",
      description: "High-definition camera drone for aerial shots",
      image: "https://picsum.photos/400/609",
      rating: 4.7,
    },
  ];

  const renderCard = (product) => {
    return (
      // Adjusted height and padding to prevent overlap
      <View className="relative border-red-400 border-[0px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-red-400 h-[650px] mx-1 ring-4 ring-red-400/30">
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            className="w-full h-[450px]" // Reduced height
            style={{ resizeMode: "cover" }}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            className="absolute bottom-0 left-0 right-0 h-2/3"
          />
        </View>

        <View className="absolute bottom-0 left-0 right-0 p-6">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-500 mb-1">
                {product.name}
              </Text>
              <Text className="text-2xl font-bold text-green-400">
                {product.price}
              </Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-gray-500 font-semibold">
                <Ionicons name="star" size={16} color="#FFD700" />{" "}
                {product.rating}
              </Text>
            </View>
          </View>

          <Text className="text-black mt-2 text-sm" numberOfLines={2}>
            {product.description}
          </Text>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full flex-row items-center">
              <Ionicons name="heart-outline" size={18} color="black" />
              <Text className="text-black ml-2 text-sm">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full flex-row items-center">
              <Ionicons name="cart-outline" size={18} color="white" />
              <Text className="text-white ml-2 text-sm">Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row shadow-sm">
      <Image source={{ uri: item.image }} className="w-24 h-24 rounded-xl" />
      <View className="flex-1 ml-4 justify-between">
        <View>
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-xl font-bold text-green-600">{item.price}</Text>
          <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-gray-700 ml-1 font-medium">
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    // Added safe area padding at the bottom
    <View className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <View className="px-4 pt-12 pb-4 bg-white shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">Trending Now</Text>
          <View className="flex-row bg-gray-100 rounded-full p-1">
            <TouchableOpacity
              onPress={() => setViewMode("card")}
              className={`px-4 py-2 rounded-full ${
                viewMode === "card" ? "bg-white shadow" : ""
              }`}
            >
              <Ionicons
                name="albums-outline"
                size={20}
                color={viewMode === "card" ? "#000" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              className={`px-4 py-2 rounded-full ${
                viewMode === "list" ? "bg-white shadow" : ""
              }`}
            >
              <Ionicons
                name="list-outline"
                size={20}
                color={viewMode === "list" ? "#000" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      {viewMode === "card" ? (
        <View className="flex-1">
          <Swiper
            cards={trendingProducts}
            renderCard={renderCard}
            onSwipedLeft={(cardIndex) =>
              console.log("Swiped NOPE on card: ", cardIndex)
            }
            onSwipedRight={(cardIndex) =>
              console.log("Swiped LIKE on card: ", cardIndex)
            }
            cardIndex={0}
            backgroundColor={"#F9FAFB"}
            stackSize={3}
            stackScale={10}
            stackSeparation={14}
            animateCardOpacity
            containerStyle={{ backgroundColor: "#F9FAFB" }}
            cardVerticalMargin={10}
            verticalSwipe={false}
          />
        </View>
      ) : (
        <FlatList
          data={trendingProducts}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="p-4 pb-4"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TrendingProducts;
