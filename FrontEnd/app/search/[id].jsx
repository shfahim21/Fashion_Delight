import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const id = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const product = {
    sku: "TANK-TOP-S-014",
    name: "Athletic Tank Top",
    brand: "FitFlex",
    description:
      "Lightweight athletic tank top with moisture-wicking technology. Perfect for intense workouts and summer training.",
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
      sub: "Athletic Wear",
    },
    attributes: {
      material: "88% Polyester, 12% Elastane",
      weight: "130g/m²",
      care: ["Machine wash cold", "Tumble dry low", "Do not iron"],
    },
    variants: [
      {
        color: "Electric Blue",
        size: "S",
        stockQuantity: 75,
        images: [
          {
            url: "https://via.placeholder.com/150", // Replace with actual URL
            alt: "Blue Athletic Tank Top Front View",
            isPrimary: true,
          },
        ],
      },
    ],
    metadata: {
      ratings: {
        average: 4.6,
        count: 134,
      },
    },
    shipping: {
      weight: 150,
      dimensions: {
        length: 25,
        width: 20,
        height: 2,
        unit: "cm",
      },
      freeShipping: true,
      estimatedDelivery: "2-4 business days",
    },
  };

  const primaryImage = product.variants[0]?.images[0]?.url;

  return (
    <ScrollView>
      <ScrollView className="bg-black flex-1">
        <Image
          source={{ uri: primaryImage }}
          className="w-full h-72 object-cover"
          resizeMode="cover"
        />
        <View className="p-5">
          {/* Product Name and Brand */}
          <Text className="text-white text-2xl font-bold">{product.name}</Text>
          <Text className="text-gray-400 text-sm mt-1">{product.brand}</Text>

          {/* Price */}
          <Text className="text-white text-xl font-semibold mt-4">
            ${product.price.amount.toFixed(2)}{" "}
            {product.discount.percentage > 0 && (
              <Text className="text-gray-400 text-sm line-through">
                ${(product.price.amount + product.discount.amount).toFixed(2)}
              </Text>
            )}
          </Text>

          {/* Ratings */}
          <View className="flex-row items-center mt-2">
            <Text className="text-gray-400 text-sm">
              ⭐ {product.metadata.ratings.average}
            </Text>
            <Text className="text-gray-500 text-sm ml-2">
              ({product.metadata.ratings.count} reviews)
            </Text>
          </View>

          {/* Description */}
          <Text className="text-gray-300 text-base mt-4">
            {product.description}
          </Text>

          {/* Attributes */}
          <View className="mt-5">
            <Text className="text-white text-lg font-semibold">Attributes</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Material: {product.attributes.material}
            </Text>
            <Text className="text-gray-400 text-sm">
              Weight: {product.attributes.weight}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              Care Instructions:
            </Text>
            {product.attributes.care.map((care, index) => (
              <Text key={index} className="text-gray-500 text-sm ml-4">
                • {care}
              </Text>
            ))}
          </View>

          {/* Shipping */}
          <View className="mt-5">
            <Text className="text-white text-lg font-semibold">Shipping</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Weight: {product.shipping.weight}g
            </Text>
            <Text className="text-gray-400 text-sm">
              Dimensions: {product.shipping.dimensions.length}x
              {product.shipping.dimensions.width}x
              {product.shipping.dimensions.height}{" "}
              {product.shipping.dimensions.unit}
            </Text>
            <Text className="text-gray-400 text-sm">
              Free Shipping: {product.shipping.freeShipping ? "Yes" : "No"}
            </Text>
            <Text className="text-gray-400 text-sm">
              Estimated Delivery: {product.shipping.estimatedDelivery}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default id;
