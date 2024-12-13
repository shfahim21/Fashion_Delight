import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Cart = () => {
  const insets = useSafeAreaInsets();

  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Casual Cotton T-Shirt",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      size: "L",
      color: "Black",
      quantity: 1,
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 59.99,
      image: "https://via.placeholder.com/150",
      size: "32",
      color: "Blue",
      quantity: 2,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 89.99,
      image: "https://via.placeholder.com/150",
      size: "42",
      color: "White",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity > 0 && newQuantity <= 10) {
            return { ...item, quantity: newQuantity };
          } else if (newQuantity > 10) {
            Alert.alert(
              "Maximum quantity limit",
              "You can't add more than 10 items"
            );
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => setCartItems(cartItems.filter((item) => item.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const CartItem = ({ item }) => (
    <View className="bg-white p-4 mb-2 rounded-xl flex-row shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-24 h-24 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-start">
          <Text className="text-gray-800 font-semibold flex-1 mr-2">
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            className="p-1 rounded-full bg-gray-50"
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View className="flex-row mt-1">
          <View className="flex-row items-center">
            <Ionicons name="resize-outline" size={14} color="#6B7280" />
            <Text className="text-gray-500 text-sm ml-1">
              Size: {item.size}
            </Text>
          </View>
          <View className="flex-row items-center ml-4">
            <Ionicons name="color-palette-outline" size={14} color="#6B7280" />
            <Text className="text-gray-500 text-sm ml-1">
              Color: {item.color}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-semibold text-gray-800">
            ${(item.price * item.quantity).toFixed(2)}
          </Text>

          <View className="flex-row items-center bg-gray-100 rounded-lg">
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, -1)}
              className="p-2"
            >
              <Ionicons name="remove-outline" size={16} color="#374151" />
            </TouchableOpacity>

            <Text className="px-3 font-medium">{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 1)}
              className="p-2"
            >
              <Ionicons name="add-outline" size={16} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 min-h-[84vh] mt-10">
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          {/* //here */}

          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Shopping Cart
            </Text>
            <Text className="text-gray-500 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="heart-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        {cartItems.length === 0 && (
          <View className="items-center justify-center py-8">
            <Ionicons name="bag-handle-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 mt-4 text-lg">
              Your cart is empty
            </Text>
            <TouchableOpacity
              className="mt-4 bg-gray-100 px-6 py-3 rounded-xl"
              onPress={() => console.log("Continue shopping")}
            >
              <Text className="text-gray-700 font-medium">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View
          className="bg-white p-4 pt-3"
          style={{ paddingBottom: 80 }}
          // insets.bottom ||
        >
          {/* Order Summary */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Order Summary
          </Text>
          <View className="border-b border-gray-100 pb-3">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="text-gray-800 font-medium">
                ${getSubtotal().toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Shipping</Text>
              <Text className="text-gray-800 font-medium">$5.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Tax (10%)</Text>
              <Text className="text-gray-800 font-medium">
                ${(getSubtotal() * 0.1).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Total */}
          <View className="flex-row justify-between items-center pt-3 mb-4">
            <Text className="text-gray-800 text-lg font-semibold">Total</Text>
            <Text className="text-xl font-bold text-gray-800">
              ${(getSubtotal() + 5 + getSubtotal() * 0.1).toFixed(2)}
            </Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            className="bg-black py-4 rounded-full items-center flex-row justify-center"
            onPress={() => console.log("Checkout pressed")}
          >
            <Ionicons
              name="cart-outline"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-white font-semibold text-lg ml-2">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
