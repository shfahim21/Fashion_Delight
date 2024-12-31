import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { AuthContext } from "../../Context/AuthProvider";

const ProductDetails = () => {
  const { dbUser } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null); // Initialize as null to detect loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fd-backend-peach.vercel.app/products/${id}`
        );
        setProduct(response.data);
        setLoading(false); // Stop loading after fetching
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-gray-300 mt-4">Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500">Error loading product details.</Text>
      </View>
    );
  }

  const primaryImage = "https://via.placeholder.com/150"; // Fallback image

  return (
    <ScrollView className="bg-black flex-1">
      <Image
        source={{ uri: primaryImage }}
        className="w-full h-72 object-cover"
        resizeMode="cover"
      />
      {/* <Text className="text-white text-2xl font-bold p-5">id: {id}</Text> */}
      <View className="p-5">
        <Text className="text-white text-2xl font-bold">{product?.name}</Text>
        <Text className="text-gray-400 text-sm mt-1">{product?.brand}</Text>

        <Text className="text-white text-xl font-semibold mt-4">
          ${product?.price?.amount.toFixed(2)}{" "}
          {product?.discount?.percentage > 0 && (
            <Text className="text-gray-400 text-sm line-through">
              ${(product?.price?.amount + product?.discount?.amount).toFixed(2)}
            </Text>
          )}
        </Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-gray-400 text-sm">
            ⭐ {product?.metadata?.ratings?.average}
          </Text>
          <Text className="text-gray-500 text-sm ml-2">
            ({product?.metadata?.ratings?.count} reviews)
          </Text>
        </View>

        <Text className="text-gray-300 text-base mt-4">
          {product?.description}
        </Text>

        <View className="mt-5">
          <Text className="text-white text-lg font-semibold">Attributes</Text>
          <Text className="text-gray-400 text-sm mt-2">
            Material: {product?.attributes?.material}
          </Text>
          <Text className="text-gray-400 text-sm">
            Weight: {product?.attributes?.weight}
          </Text>
          <Text className="text-gray-400 text-sm mt-2">Care Instructions:</Text>
          {product?.attributes?.care?.map((care, index) => (
            <Text key={index} className="text-gray-500 text-sm ml-4">
              • {care}
            </Text>
          ))}
        </View>

        <View className="mt-5">
          <Text className="text-white text-lg font-semibold">Shipping</Text>
          <Text className="text-gray-400 text-sm mt-2">
            Weight: {product?.shipping?.weight}g
          </Text>
          <Text className="text-gray-400 text-sm">
            Dimensions: {product?.shipping?.dimensions?.length}x
            {product?.shipping?.dimensions?.width}x
            {product?.shipping?.dimensions?.height}{" "}
            {product?.shipping?.dimensions?.unit}
          </Text>
          <Text className="text-gray-400 text-sm">
            Free Shipping: {product?.shipping?.freeShipping ? "Yes" : "No"}
          </Text>
          <Text className="text-gray-400 text-sm">
            Estimated Delivery: {product?.shipping?.estimatedDelivery}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
