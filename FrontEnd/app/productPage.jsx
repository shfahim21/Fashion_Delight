import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  // Sample product data
  const product = {
    name: "Vintage Leather Jacket",
    brand: "Urban Classics",
    price: 249.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      "A timeless leather jacket crafted from premium quality leather. Perfect for adding an edge to any outfit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Tan"],
    images: [
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg",
    ],
    details: [
      "100% Genuine Leather",
      "Full Zip Closure",
      "Two Front Pockets",
      "Slim Fit Design",
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 5,
        date: "2 weeks ago",
        text: "Absolutely love this jacket! The quality is exceptional and it fits perfectly.",
      },
      {
        name: "Michael T.",
        rating: 4,
        date: "1 month ago",
        text: "Great jacket, very comfortable. Runs slightly small, so I recommend sizing up.",
      },
    ],
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < Math.floor(rating) ? "star" : "star-o"}
        color={index < Math.floor(rating) ? "#FFD700" : "#E0E0E0"}
        size={20}
      />
    ));
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(contentOffsetX / layoutWidth);
    setCurrentIndex(index);
  };

  // const BackButton = ({ onPress }) => (
  //   <TouchableOpacity
  //     onPress={onPress}
  //     className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
  //     style={{
  //       elevation: 2,
  //       shadowColor: "#000",
  //       shadowOffset: { width: 0, height: 2 },
  //       shadowOpacity: 0.1,
  //     }}
  //   >
  //     <Ionicons name="arrow-back" size={24} color="black" />
  //   </TouchableOpacity>
  // );

  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const screenWidth = Dimensions.get("window").width;

  // Calculate the height for a 2:3 ratio
  const imageHeight = (screenWidth * 4) / 3;

  return (
    <ScrollView className="flex-1 bg-white  mt-10">
      <View className="relative">
        {/* Image Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="h-96 shadow-lg rounded-b-2xl"
          style={{ height: imageHeight }}
        >
          {product.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              className="w-screen h-full rounded-3xl"
              resizeMode="cover"
              style={{ width: screenWidth, height: imageHeight }}
              onError={(error) => console.log("Image loading error:", error)}
            />
          ))}
        </ScrollView>

        {/* Transparent Back Button */}
        <View className="absolute top-4 left-4 z-10">
          <TouchableOpacity
            onPress={handleBackPress}
            className="w-10 h-10 bg-gray-100/50 rounded-full items-center justify-center"
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Pagination Indicators */}
        <View className="flex-row justify-center items-center mt-2">
          {product.images.map((_, index) => (
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
          <Text className="text-xl font-bold mb-2">{product.name}</Text>
          <View className="flex-row items-center">
            <TouchableOpacity className="bg-cyan-100 px-3 py-1 rounded-full mr-3">
              <Text className="text-cyan-700 text-sm font-semibold">
                {product.brand}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              {renderStars(product.rating)}
              <Text className="ml-2 text-gray-500 text-sm">
                ({product.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Product Information Container */}
      <View className="p-4">
        {/* Product Name and Brand Section
        <View className="mt-4 w-full bg-white rounded-xl p-4">
          <View className="flex-col">
            <Text className="text-2xl font-bold mb-2">{product.name}</Text>

            <View className="flex-row items-center mb-3">
              <TouchableOpacity className="bg-cyan-100 px-3 py-1 rounded-full mr-3">
                <Text className="text-cyan-700 text-sm font-semibold">
                  {product.brand}
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center">
                {renderStars(product.rating)}
                <Text className="ml-2 text-gray-500 text-sm">
                  ({product.reviewCount} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Price and Actions */}
        <View className="mt-4 w-full">
          <View className="w-full bg-green-100 rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-3xl font-bold text-black mr-3">
                  $199.99
                </Text>
                <Text className="text-lg text-gray-500 line-through mr-3">
                  $249.99
                </Text>
                <View className="bg-red-500 px-2 py-1 rounded-full">
                  <Text className="text-white text-xs font-bold">20% OFF</Text>
                </View>
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
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  className={`
            mr-2 mb-2 px-4 py-2 rounded-full border
            ${
              selectedSize === size
                ? "bg-black border-black"
                : "bg-white border-gray-300"
            }
          `}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    className={`
              font-bold
              ${selectedSize === size ? "text-white" : "text-black"}
            `}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View className="mb-4">
            <Text className="font-semibold text-md mb-2">Select Color</Text>
            <View className="flex-row flex-wrap">
              {product.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  className={`
            mr-2 mb-2 px-4 py-2 rounded-full border
            ${
              selectedColor === color
                ? "border-black bg-white"
                : "border-gray-300 bg-white"
            }
          `}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text className="font-bold">{color}</Text>
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
        {/* Tabs */}
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
          ${
            activeTab.toLowerCase() === tab.toLowerCase()
              ? "text-black"
              : "text-gray-500"
          }
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
              <Text className="text-base text-gray-700 mb-4">
                {product.description}
              </Text>
              <View>
                {product.details.map((detail, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-2 h-2 bg-black rounded-full mr-3" />
                    <Text className="text-gray-600 flex-1">{detail}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View>
              {/* Reviews Section */}
              <View>
                {product.reviews.map((review, index) => (
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
                          <Text className="font-bold">
                            {review.name.charAt(0)}
                          </Text>
                        </View>
                        <View>
                          <Text className="font-bold">{review.name}</Text>
                          <Text className="text-xs text-gray-500">
                            {review.date}
                          </Text>
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
                  <Text className="text-white text-center font-bold">
                    Submit Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailPage;
