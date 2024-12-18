import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";

const TrendingProducts = () => {
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
      <View className="bg-white rounded-lg shadow-md h-[700px]">
        <Image
          source={{ uri: product.image }}
          className="w-full h-[500px] rounded-t-lg"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800">
            {product.name}
          </Text>
          <Text className="text-2xl font-semibold text-green-700 mt-2">
            {product.price}
          </Text>
          <Text className="text-sm text-gray-600 mt-2">
            {product.description}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-yellow-500 font-semibold">
              ★ {product.rating}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="h-full bg-gray-100">
      <Text className="text-xl font-bold p-4 text-gray-800">Trending Now</Text>
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
        backgroundColor={"#f8f8f8"}
        stackSize={3}
        stackScale={10}
        stackSeparation={14}
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: {
                backgroundColor: "#FF0000",
                color: "#fff",
                fontSize: 24,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: {
                backgroundColor: "#4CAF50",
                color: "#fff",
                fontSize: 24,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
      />
    </View>
  );
};

export default TrendingProducts;
