import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Wishlist = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "https://fashion-delight.vercel.app/products"
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
    <SafeAreaView>
      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center mt-5 ">
          Wish List
        </Text>
        <View className="flex-row flex-wrap justify-between px-5">
          {featuredProducts.map((product) => (
            <TouchableOpacity
              key={product._id}
              className="bg-white rounded-2xl w-[48%] mb-4 shadow-sm overflow-hidden"
              onPress={() => router.push(`/product/${product.id}`)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
