
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AuthContext } from "../Context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import API_URL from "../config";
import { router } from "expo-router";

const WishlistScreen = () => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    if (!user?.email) return;
    
    try {
      setError(null);
      const response = await axios.get(
        `${API_URL}/users/${user.email}/wishlist`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.wishlist) {
        setWishlistItems(response.data.wishlist);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user?.email) return;

    try {
      const response = await axios.delete(
        `${API_URL}/users/${user.email}/wishlist/${productId}`
      );

      if (response.data.success) {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const renderWishlistItem = ({ item }) => (
    <View className="mb-2 mx-3">
      <View className="bg-white rounded-2xl shadow-md">
        <View className="p-4">
          {/* Product Header */}
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {item.product.name}
              </Text>
              <Text className="text-xs text-gray-500">
                Added {new Date(item.addedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => removeFromWishlist(item.productId)}
              className="w-8 h-8 bg-red-50 rounded-full items-center justify-center"
            >
              <Ionicons name="heart" size={18} color="#FF4444" />
            </TouchableOpacity>
          </View>

          {/* Product Content */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-3">
                <Ionicons name="shirt-outline" size={24} color="#666" />
              </View>
              <View>
                <Text className="text-xl font-bold text-green-600">
                  {item.product.price.currency === 'USD' ? '$' : item.product.price.currency}
                  {item.product.price.amount.toFixed(2)}
                </Text>
                {item.product.available ? (
                  <Text className="text-xs text-green-500">In Stock</Text>
                ) : (
                  <Text className="text-xs text-red-500">Out of Stock</Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row">
      <TouchableOpacity 
        className="bg-black px-4 py-2 rounded-full mr-2"
        onPress={() => handleAddToCart(item)}
      >
        <Text className="text-white text-sm font-medium">Add to Cart</Text>
      </TouchableOpacity>
    </View>



          </View>
        </View>
      </View>
    </View>
  );

  const EmptyWishlist = () => (
    <View className="flex-1 justify-center items-center p-4">
      <View className="bg-gray-50 w-24 h-24 rounded-full items-center justify-center mb-4">
        <Ionicons name="heart-outline" size={48} color="#999" />
      </View>
      <Text className="text-xl font-bold text-gray-800 mb-2">
        Your wishlist is empty
      </Text>
      <Text className="text-sm text-gray-500 text-center max-w-[250px]">
        Save your favorite items to keep track of products you love
      </Text>
      <TouchableOpacity 
        className="mt-6 bg-blue-500 px-6 py-3 rounded-full"
        onPress={() => {router.push("../(tabs)/home")}}
      >
        <Text className="text-white font-medium">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const ListHeader = () => (
    <View className="px-4 py-3 bg-white">
      <Text className="text-2xl font-bold text-gray-800">My Wishlist</Text>
      <Text className="text-sm text-gray-500 mt-1">
        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );


  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Sample sizes and colors (adjust according to your product data)
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Blue", "Red"];

  const handleAddToCart = async (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const submitToCart = async () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert("Error", "Please select both size and color");
      return;
    }

    if (!user?.email) {
      Alert.alert("Error", "Please login to add items to cart");
      return;
    }

    try {
      setIsAddingToCart(true);
      
      const cartItem = {
        productId: selectedProduct.productId,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };

      const response = await axios.put(
        `${API_URL}/users/${user.email}/cart`,
        cartItem,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        setShowModal(false);
        Alert.alert(
          "Success", 
          "Product added to cart successfully!",
          [
            {
              text: "View Cart",
              onPress: () => {
                // Navigate to cart screen
                // router.push("/cart");
              }
            },
            {
              text: "Continue Shopping",
              style: "cancel"
            }
          ]
        );

        // Reset selections
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
        setSelectedProduct(null);
      } else {
        throw new Error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || 
        error.message || 
        "Failed to add item to cart. Please try again."
      );
    } finally {
      setIsAddingToCart(false);
    }
  };


  const SelectionModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Select Options
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <Text className="text-gray-800 font-medium mb-2">Size</Text>
          <View className="flex-row flex-wrap mb-4">
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selectedSize === size
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                <Text
                  className={`${
                    selectedSize === size ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color Selection */}
          <Text className="text-gray-800 font-medium mb-2">Color</Text>
          <View className="flex-row flex-wrap mb-4">
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                className={`mr-2 mb-2 px-4 py-2 rounded-full border ${
                  selectedColor === color
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                <Text
                  className={`${
                    selectedColor === color ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selection */}
          <Text className="text-gray-800 font-medium mb-2">Quantity</Text>
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="remove" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="mx-4 text-lg">{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="add" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={submitToCart}
            disabled={isAddingToCart}
            className="bg-black py-4 rounded-full items-center"
          >
            {isAddingToCart ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">
                Add to Cart
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


// const ErrorMessage = () => (
//     <View className="flex-1 items-center justify-center py-20">
//       <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
//         <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
//       </View>
//       <Text className="text-gray-800 text-xl font-bold mb-2">Oops!</Text>
//       <Text className="text-gray-500 text-center mb-6 px-10">{error}</Text>
//       <TouchableOpacity
//         className="bg-black px-8 py-3 rounded-full"
//         onPress={() => {console.log("Navigate to login");
//           router.push("/sign-in");
//         }}
//       >
//         <Text className="text-white font-semibold">Login</Text>
//       </TouchableOpacity>
//     </View>
//   );

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center py-20">
      <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
        <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
      </View>
      <Text className="text-gray-800 text-xl font-bold mb-2">Oops!</Text>
      <Text className="text-gray-500 text-center mb-6 px-10">Please Login to view your wishlist.</Text>
      <TouchableOpacity
        className="bg-black px-8 py-3 rounded-full"
        onPress={() => {console.log("Navigate to login");
          router.push("/sign-in");
        }}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center p-4">
          <View className="bg-red-50 w-24 h-24 rounded-full items-center justify-center mb-4">
            <Ionicons name="alert-circle-outline" size={48} color="#FF4444" />
          </View>
          <Text className="text-xl font-bold text-gray-800 mb-2">Oops!</Text>
          <Text className="text-sm text-gray-500 text-center mb-6">{error}</Text>
          <TouchableOpacity 
            onPress={fetchWishlist}
            className="bg-blue-500 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 mt-10 bg-gray-50">
      <StatusBar style="dark" />
      {loading ? (
        <View className="flex-1 mt justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.productId}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={EmptyWishlist}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor="#3B82F6"
            />
          }
          contentContainerStyle={
            wishlistItems.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
          }
        />
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;