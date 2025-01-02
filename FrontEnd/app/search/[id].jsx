import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../Context/AuthProvider";

const ProductDetails = () => {
  const { dbUser } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const imageHeight = (screenWidth * 5) / 4;

  const defaultImages = ["https://via.placeholder.com/400"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fd-backend-peach.vercel.app/products/${id}`
        );

        const processedProduct = {
          ...response.data,
          images: response.data.variants.flatMap(variant => 
            variant.images.map(image => image.url)
          ),
          rating: response.data.metadata?.ratings?.average || 0,
          reviewCount: response.data.metadata?.ratings?.count || 0,
        };

        setProduct(processedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct({
          name: "Error Loading Product",
          brand: "Unknown",
          price: { amount: 0, currency: "USD" },
          images: defaultImages,
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black"],
          rating: 0,
          reviewCount: 0,
          description: "",
          attributes: {
            material: "",
            weight: "",
            care: [],
          },
          shipping: {
            weight: 0,
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: "cm",
            },
            freeShipping: false,
            estimatedDelivery: "",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(contentOffsetX / layoutWidth);
    setCurrentIndex(index);
  };

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < Math.floor(rating) ? "star" : "star-o"}
        color={index < Math.floor(rating) ? "#FFD700" : "#E0E0E0"}
        size={20}
      />
    ));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000000" />
        <Text className="text-gray-700 mt-4">Loading product details...</Text>
      </View>
    );
  }

  const displayProduct = product || {
    images: defaultImages,
    name: "Product Not Found",
    brand: "Unknown",
    rating: 0,
    reviewCount: 0,
  };

  return (
    <ScrollView className="flex-1 bg-white mt-9">
      <View className="relative">
        {/* Image Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ height: imageHeight }}
        >
          {(displayProduct.images || [defaultImages]).map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{ width: screenWidth, height: imageHeight }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Transparent Back Button */}
        <View className="absolute top-2 left-2 z-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-gray-100/50 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>
        </View>

        {/* Pagination Indicators */}
        <View className="flex-row justify-center items-center mt-2">
          {displayProduct.images.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex === index ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        {/* Product Name and Brand */}
        <View className="mt-4 px-4">
          <Text className="text-xl font-bold mb-2">{displayProduct.name}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity className="bg-cyan-100 px-3 py-1 rounded-full mr-3">
              <Text className="text-cyan-700 text-sm font-semibold">
                {displayProduct.brand}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              {renderStars(displayProduct.rating)}
              <Text className="ml-2 text-gray-500 text-sm">
                ({displayProduct.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Product Information Container */}
      <View className="p-4">
        {/* Price and Actions */}
        <View className="mt-4 w-full">
          <View className="w-full bg-green-100 rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-3xl font-bold text-black mr-3">
                  ${displayProduct.price.amount.toFixed(2)}
                </Text>
                {displayProduct.discount?.percentage > 0 && (
                  <>
                    <Text className="text-lg text-gray-500 line-through mr-3">
                      ${(displayProduct.price.amount + displayProduct.discount.amount).toFixed(2)}
                    </Text>
                    <View className="bg-red-500 px-2 py-1 rounded-full">
                      <Text className="text-white text-xs font-bold">
                        {displayProduct.discount.percentage}% OFF
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-4">
              <TouchableOpacity
                className="w-16 h-16 rounded-full bg-white items-center justify-center"
                style={{
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                }}
              >
                <Ionicons name="heart-outline" color="#333" size={28} />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-black py-4 rounded-full flex-row items-center justify-center ml-4"
                style={{
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                }}
              >
                <Ionicons
                  name="cart-outline"
                  color="white"
                  size={24}
                  style={{ marginRight: 10 }}
                />
                <Text className="text-white font-bold text-base">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Product Customization */}
        <View className="mt-4 w-full bg-gray-100 rounded-xl p-4">
          <Text className="font-bold text-lg mb-3">Customize Your Product</Text>

          {/* Size Selection */}
          <View className="mb-4">
            <Text className="font-semibold text-md mb-2">Select Size</Text>
            <View className="flex-row flex-wrap">
              {(displayProduct.variants || []).map((variant) => (
                <TouchableOpacity
                  key={variant.size}
                  className={`
                    mr-2 mb-2 px-4 py-2 rounded-full border
                    ${selectedSize === variant.size ? "bg-black border-black" : "bg-white border-gray-300"}
                  `}
                  onPress={() => setSelectedSize(variant.size)}
                >
                  <Text className={`font-bold ${selectedSize === variant.size ? "text-white" : "text-black"}`}>
                    {variant.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View className="mb-4">
            <Text className="font-semibold text-md mb-2">Select Color</Text>
            <View className="flex-row flex-wrap">
              {(displayProduct.variants || []).map((variant) => (
                <TouchableOpacity
                  key={variant.color}
                  className={`
                    mr-2 mb-2 px-4 py-2 rounded-full border
                    ${selectedColor === variant.color ? "border-black bg-white" : "border-gray-300 bg-white"}
                  `}
                  onPress={() => setSelectedColor(variant.color)}
                >
                  <Text className="font-bold">{variant.color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View>
            <Text className="font-semibold text-md mb-2">Quantity</Text>
            <View
              className="flex-row items-center justify-between bg-white rounded-full"
              style={{
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
              }}
            >
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 rounded-l-full"
              >
                <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text className="px-4 font-bold">{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="p-3 rounded-r-full"
              >
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs Section */}
        <View className="mt-4 w-full bg-gray-100 rounded-xl p-4">
          <View className="flex-row justify-between border-b border-gray-300 pb-2 mb-4">
            {["Details", "Reviews"].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 items-center pb-2 `}
                onPress={() => setActiveTab(tab.toLowerCase())}
              >
                <Text
                  className={`
                    font-bold text-base
                    ${activeTab.toLowerCase() === tab.toLowerCase() ? "text-black" : "text-gray-500"}
                  `}
                >
                  {tab}
                </Text>
                {activeTab.toLowerCase() === tab.toLowerCase() && (
                  <View className="absolute bottom-0 h-1 bg-black w-1/2 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Content based on active tab */}
          {activeTab === "details" ? (
            <View>
              <Text className="text-base text-gray-700 mb-4">{displayProduct.description}</Text>
              <View>
                <Text className="font-semibold mb-2">Material & Care</Text>
                <Text className="text-gray-600">Material: {displayProduct.attributes.material}</Text>
                <Text className="text-gray-600">Weight: {displayProduct.attributes.weight}</Text>
                {(displayProduct.attributes.care || []).map((instruction, index) => (
                  <Text key={index} className="text-gray-600">• {instruction}</Text>
                ))}
              </View>
              <View className="mb-4">
                <Text className="font-semibold mb-2">Shipping Information</Text>
                <Text className="text-gray-600">Delivery: {displayProduct.shipping.estimatedDelivery}</Text>
                <Text className="text-gray-600">Free Shipping: {displayProduct.shipping.freeShipping ? "Yes" : "No"}</Text>
              </View>
            </View>
          ) : (
            <View>
              {/* Reviews Section */}
              <View>
                {displayProduct.reviews.map((review, index) => (
                  <View
                    key={index}
                    className="bg-white rounded-xl p-2 mb-2"
                    style={{
                      elevation: 2,
                      shadowColor: "#ffff",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                    }}
                  >
                    <View className="flex-row justify-between items-center mb-1">
                      <View className="flex-row items-center p-1">
                        <View className="w-10 h-10 bg-gray-200 rounded-full mr-3 items-center justify-center">
                          <Text className="font-bold">{review.name.charAt(0)}</Text>
                        </View>
                        <View>
                          <Text className="font-bold">{review.name}</Text>
                          <Text className="text-xs text-gray-500">{review.date}</Text>
                        </View>
                      </View>
                      <View className="flex-row">
                        {renderStars(review.rating)}
                      </View>
                    </View>
                    <Text className="text-gray-700">{review.text}</Text>
                  </View>
                ))}
              </View>

              {/* Add Review Section */}
              <View
                className="mt-4 bg-white rounded-xl p-4"
                style={{
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                }}
              >
                <Text className="font-bold text-lg mb-4">Write a Review</Text>

                <View className="flex-row justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} className="mx-2">
                      <FontAwesome name="star-o" color="#E0E0E0" size={30} />
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  placeholder="Share your experience"
                  multiline
                  className="border border-gray-300 p-4 rounded-xl h-32 mb-4"
                  placeholderTextColor="#A0A0A0"
                />

                <TouchableOpacity className="bg-black py-4 rounded-full">
                  <Text className="text-white text-center font-bold">Submit Review</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;