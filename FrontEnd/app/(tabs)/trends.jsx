

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import API_URL from "../../config";

const TrendingProducts = () => {
  const [viewMode, setViewMode] = useState("card");
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setFeaturedProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const {width, height } = Dimensions.get("window");

  const renderCard = (product) => {
    // Get the primary image URL from the first variant
    const primaryImage =
      product.variants[0]?.images.find((img) => img.isPrimary)?.url ||
      product.variants[0]?.images[0]?.url;
  
    // Define height ratios for the card and image
    const cardHeight = height * 0.75; // Card height is 80% of screen height
    const imageHeight = cardHeight * 0.6; // Image height is 60% of card height
  
    return (
      <View
        style={{
          height: cardHeight,
          backgroundColor: '#fff',
          borderRadius: 20,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 15,
          elevation: 5, // For Android shadow
          marginHorizontal: 5,
          marginVertical: 10,
        }}
      >
        {/* Image Section */}
        <View style={{ height: imageHeight }}>
          <Image
            source={{ uri: primaryImage }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
          {/* Linear Gradient overlay on image for a modern look */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
            }}
          />
        </View>
  
        {/* Non-Image Section with Neon Linear Gradient */}
        <LinearGradient
          colors={['#0f0c29', '#302b63', '#24243e']}
          // Neon gradient colors
          style={{ flex: 1, padding: 20 }}
        >
          {/* Content */}
          <View style={{ flex: 1 }}>
            {/* Product Name and Rating */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#FFFFFF', // White text for contrast
                  flex: 1,
                  marginRight: 10,
                }}
              >
                {product.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent background
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                }}
              >
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={{ marginLeft: 5, color: '#FFFFFF', fontWeight: '500' }}>
                  {product.metadata.ratings.average}
                </Text>
              </View>
            </View>
  
            {/* Price */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#39FF14', // Neon green for price
                marginTop: 10,
              }}
            >
              ${product.price.amount}
            </Text>
  
            {/* Product Description */}
            <Text
              style={{ color: '#CCCCCC', marginTop: 10, fontSize: 16 }}
              numberOfLines={2}
            >
              {product.description}
            </Text>
  
            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              {/* Save Button */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 20, 147, 0.1)', // Semi-transparent neon pink
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#FF1493', // Neon pink border
                }}
              >
                <Ionicons name="heart" size={20} color="#FF1493" />
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#FF1493',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
  
              {/* Add to Cart Button */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)', // Semi-transparent neon cyan
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#00FFFF', // Neon cyan border
                }}
              >
                <Ionicons name="cart" size={20} color="#00FFFF" />
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#00FFFF',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    const primaryImage = item.variants[0]?.images.find(img => img.isPrimary)?.url || item.variants[0]?.images[0]?.url;

    return (
      <TouchableOpacity className="border-gray-300 shadow-sm shadow-slate-500 border-[1px] rounded-2xl p-2 mb-2 ml-2 mr-2 flex-row shadow-sm">
        <Image source={{ uri: primaryImage }} className="w-24 h-24 rounded-xl" />
        <View className="flex-1 ml-4 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-xl font-bold text-green-600">
              ${item.price.amount}
            </Text>
            <View className="flex-row border-[1px] border-gray-200 items-center px-2 py-1 rounded-full">
              <Ionicons name="star" size={16} color="#FFD500" />
              <Text className="text-gray-700 ml-1 font-medium">
                {item.metadata.ratings.average}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white pb-20">
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
          {featuredProducts.length > 0 && (
            <Swiper
              cards={featuredProducts}
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
              containerStyle={{ backgroundColor: "#FFFF" }}
              cardVerticalMargin={5}
              verticalSwipe={false}
            />
          )}
        </View>
      ) : (
        <FlatList
          data={featuredProducts}
          renderItem={renderListItem}
          keyExtractor={(item) => item._id.$oid}
          contentContainerClassName="p-4 pb-2"
          showsVerticalScrollIndicator={false}
          backgroundColor="#FFFFFF"
          gap={16}
        />
      )}
    </View>
  );
};

export default TrendingProducts;