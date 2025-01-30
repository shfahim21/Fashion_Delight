// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";

// const Cart = () => {
//   const insets = useSafeAreaInsets();
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Casual Cotton T-Shirt",
//       price: 29.99,
//       image: "https://via.placeholder.com/150",
//       size: "L",
//       color: "Black",
//       quantity: 1,
//     },
//     {
//       id: 2,
//       name: "Slim Fit Jeans",
//       price: 59.99,
//       image: "https://via.placeholder.com/150",
//       size: "32",
//       color: "Blue",
//       quantity: 2,
//     },
//     {
//       id: 3,
//       name: "Running Shoes",
//       price: 89.99,
//       image: "https://via.placeholder.com/150",
//       size: "42",
//       color: "White",
//       quantity: 1,
//     },
//   ]);

//   const getSubtotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };
//   const updateQuantity = (id, change) => {
//     setCartItems(
//       cartItems.map((item) => {
//         if (item.id === id) {
//           const newQuantity = item.quantity + change;
//           if (newQuantity > 0 && newQuantity <= 10) {
//             return { ...item, quantity: newQuantity };
//           } else if (newQuantity > 10) {
//             Alert.alert(
//               "Maximum quantity limit",
//               "You can't add more than 10 items"
//             );
//           }
//         }
//         return item;
//       })
//     );
//   };

//   const removeItem = (id) => {
//     Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Remove",
//         onPress: () => setCartItems(cartItems.filter((item) => item.id !== id)),
//         style: "destructive",
//       },
//     ]);
//   };

//   const CartItem = ({ item }) => (
//     <View className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
//       <View className="p-4 flex-row">
//         {/* Product Image with Badge */}
//         <View className="relative">
//           <Image
//             source={{ uri: item.image }}
//             className="w-24 h-24 rounded-xl"
//             resizeMode="cover"
//           />
//           <View className="absolute top-0 right-0 bg-black/70 px-2 py-1 rounded-bl-xl rounded-tr-xl">
//             <Text className="text-white text-xs font-medium">
//               ${item.price}
//             </Text>
//           </View>
//         </View>

//         {/* Product Details */}
//         <View className="flex-1 ml-4 justify-between">
//           <View>
//             <View className="flex-row justify-between items-start">
//               <Text className="text-gray-800 font-bold text-lg flex-1 mr-2">
//                 {item.name}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => removeItem(item.id)}
//                 className="p-2 rounded-full bg-red-50"
//               >
//                 <Ionicons name="trash-outline" size={18} color="#EF4444" />
//               </TouchableOpacity>
//             </View>

//             {/* Product Attributes */}
//             <View className="flex-row mt-1 space-x-3">
//               <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
//                 <Text className="text-gray-600 text-xs">Size: {item.size}</Text>
//               </View>
//               <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
//                 <View className="w-2 h-2 rounded-full bg-black mr-1" />
//                 <Text className="text-gray-600 text-xs">{item.color}</Text>
//               </View>
//             </View>
//           </View>

//           {/* Quantity Controls */}
//           <View className="flex-row items-center justify-between mt-2">
//             <View className="flex-row items-center bg-gray-100 rounded-full">
//               <TouchableOpacity
//                 onPress={() => updateQuantity(item.id, -1)}
//                 className="w-8 h-8 items-center justify-center"
//               >
//                 <Ionicons name="remove" size={16} color="#374151" />
//               </TouchableOpacity>
//               <Text className="px-3 font-bold">{item.quantity}</Text>
//               <TouchableOpacity
//                 onPress={() => updateQuantity(item.id, 1)}
//                 className="w-8 h-8 items-center justify-center"
//               >
//                 <Ionicons name="add" size={16} color="#374151" />
//               </TouchableOpacity>
//             </View>
//             <Text className="font-bold text-lg">
//               ${(item.price * item.quantity).toFixed(2)}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );



//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-4 pt-12 pb-1">
//         <View className="flex-row items-center justify-between">
//           <View>
//             <Text className="text-2xl font-bold text-gray-800">My Cart</Text>
//             <Text className="text-gray-500">
//               {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
//             </Text>
//           </View>
//           {cartItems.length > 0 && (
//             <TouchableOpacity
//               className="bg-gray-100 p-2 rounded-full"
//               onPress={() => Alert.alert("Clear cart?")}
//             >
//               <Ionicons name="trash-outline" size={20} color="#374151" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {cartItems.length === 0 ? (
//         <EmptyCart />
//       ) : (
//         <>
//           <ScrollView className="flex-1 px-4">
//             {cartItems.map((item) => (
//               <CartItem key={item.id} item={item} />
//             ))}

//             {/* Promo Code */}
//             <View className="bg-white p-4 rounded-2xl mb-4">
//               <Text className="font-semibold text-gray-800 mb-2">
//                 Promo Code
//               </Text>
//               <View className="flex-row">
//                 <View className="flex-1 bg-gray-100 rounded-l-xl px-4 py-3">
//                   <Text className="text-gray-500">Enter promo code</Text>
//                 </View>
//                 <TouchableOpacity className="bg-black px-6 rounded-r-xl items-center justify-center">
//                   <Text className="text-white font-medium">Apply</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>

//           {/* Checkout Section */}
//           <View
//             className="bg-white p-6"
//             style={{ paddingBottom: insets.bottom + 20 }}
//           >
//             <View className="flex-row justify-between mb-4">
//               <Text className="text-gray-500">Subtotal</Text>
//               <Text className="font-semibold">${getSubtotal().toFixed(2)}</Text>
//             </View>
//             <View className="flex-row justify-between mb-4">
//               <Text className="text-gray-500">Shipping</Text>
//               <Text className="font-semibold">$5.00</Text>
//             </View>
//             {/* <View className="flex-row justify-between pb-4 mb-4 border-b border-gray-100">
//               <Text className="text-gray-500">Tax</Text>
//               <Text className="font-semibold">
//                 ${(getSubtotal() * 0.1).toFixed(2)}
//               </Text>
//             </View> */}
//             <View className="flex-row justify-between mb-6">
//               <Text className="text-lg font-bold">Total</Text>
//               <Text className="text-lg font-bold">
//                 ${(getSubtotal() + 5 + getSubtotal() * 0.1).toFixed(2)}
//               </Text>
//             </View>

//             <TouchableOpacity
//               className="bg-black py-4 rounded-2xl items-center mb-16"
//               onPress={() => console.log("Checkout")}
//             >
//               <Text className="text-white font-bold text-lg">
//                 Proceed to Checkout
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Cart;



import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import API_URL from "../../config";

const Cart = () => {
  const insets = useSafeAreaInsets();
  const { dbUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart items
  const fetchCartItems = async () => {
    // Check if dbUser exists
    if (!dbUser?.email) {
      setError("Please login to view your cart");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_URL}/users/${dbUser.email}/cart`
      );

      if (response.data.success) {
        setCartItems(response.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [dbUser?.email]);

  // Add an error state component
  const ErrorMessage = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
        <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
      </View>
      <Text className="text-gray-800 text-xl font-bold mb-2">Oops!</Text>
      <Text className="text-gray-500 text-center mb-6 px-10">{error}</Text>
      <TouchableOpacity
        className="bg-black px-8 py-3 rounded-full"
        onPress={() => console.log("Navigate to login")}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2">Loading cart...</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2">Loading cart...</Text>
      </View>
    );
  }

  // if (error) {
  //   return <ErrorMessage />;
  // }

  // Update quantity
  const updateQuantity = async (productId, change, currentQuantity) => {
    const newQuantity = currentQuantity + change;
    
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }

    if (newQuantity > 10) {
      Alert.alert("Maximum quantity limit", "You can't add more than 10 items");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/users/${dbUser.email}/cart/${productId}`,
        {
          quantity: newQuantity
        }
      );

      if (response.data.success) {
        fetchCartItems(); // Refresh cart items
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      Alert.alert("Error", "Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `${API_URL}/users/${dbUser.email}/cart/${productId}`
              );

              if (response.data.success) {
                fetchCartItems(); // Refresh cart items
              }
            } catch (error) {
              console.error("Error removing item:", error);
              Alert.alert("Error", "Failed to remove item");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
  };

  const CartItem = ({ item }) => (
    <View className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
      <View className="p-4 flex-row">
        <View className="relative">
          <Image
            source={{ uri: item.product.image || "https://via.placeholder.com/150" }}
            className="w-24 h-24 rounded-xl"
            resizeMode="cover"
          />
          <View className="absolute top-0 right-0 bg-black/70 px-2 py-1 rounded-bl-xl rounded-tr-xl">
            <Text className="text-white text-xs font-medium">
              ${item.product.price.amount}
            </Text>
          </View>
        </View>

        <View className="flex-1 ml-4 justify-between">
          <View>
            <View className="flex-row justify-between items-start">
              <Text className="text-gray-800 font-bold text-lg flex-1 mr-2">
                {item.product.name}
              </Text>
              <TouchableOpacity
                onPress={() => removeItem(item.productId)}
                className="p-2 rounded-full bg-red-50"
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View className="flex-row mt-1 space-x-3">
              <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
                <Text className="text-gray-600 text-xs">Size: {item.size}</Text>
              </View>
              <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-black mr-1" />
                <Text className="text-gray-600 text-xs">{item.color}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center bg-gray-100 rounded-full">
              <TouchableOpacity
                onPress={() => updateQuantity(item.productId, -1, item.quantity)}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="remove" size={16} color="#374151" />
              </TouchableOpacity>
              <Text className="px-3 font-bold">{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.productId, 1, item.quantity)}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="add" size={16} color="#374151" />
              </TouchableOpacity>
            </View>
            <Text className="font-bold text-lg">
              ${(item.product.price.amount * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const EmptyCart = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
        <Ionicons name="cart-outline" size={40} color="#9CA3AF" />
      </View>
      <Text className="text-gray-800 text-xl font-bold mb-2">
        Cart is Empty
      </Text>
      <Text className="text-gray-500 text-center mb-6 px-10">
        Looks like you haven't added anything to your cart yet
      </Text>
      <TouchableOpacity
        className="bg-black px-8 py-3 rounded-full"
        onPress={() => console.log("Continue shopping")}
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2">Loading cart...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 pt-12 pb-1">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-800">My Cart</Text>
            <Text className="text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Text>
          </View>
          {cartItems.length > 0 && (
            <TouchableOpacity
              className="bg-gray-100 p-2 rounded-full"
              onPress={() => Alert.alert("Clear cart?")}
            >
              <Ionicons name="trash-outline" size={20} color="#374151" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <ScrollView 
            className="flex-1 px-4"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchCartItems} />
            }
          >
            {cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}

            {/* ... Rest of the cart UI remains the same ... */}
          </ScrollView>

          {/* Checkout Section */}
          <View
            className="bg-white p-6"
            style={{ paddingBottom: insets.bottom + 20 }}
          >
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="font-semibold">${getSubtotal().toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-500">Shipping</Text>
              <Text className="font-semibold">$5.00</Text>
            </View>
            <View className="flex-row justify-between mb-6">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold">
                ${(getSubtotal() + 5).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-black py-4 rounded-2xl items-center mb-16"
              onPress={() => console.log("Checkout")}
            >
              <Text className="text-white font-bold text-lg">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;