import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateAddress = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handleAddress = async () => {
    try {
      // Uncomment this when you implement the backend functionality
      // const response = await axios.put(
      //   "https://fashion-delight.vercel.app/users/1/address",
      //   { address, city, zip }
      // );
      console.log("Address updated successfully:", { address, city, zip });
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center mt-5 ">
          Update Address
        </Text>
        <View className="flex-1 p-4">
          <TextInput
            placeholder="Enter your address"
            className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-16"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            placeholder="Enter your city"
            className="border border-gray-300 rounded-lg p-3 mb-4 bg-white h-16"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            placeholder="Enter your zip code"
            className="border border-gray-300 rounded-lg p-3 mb-6 bg-white h-16"
            keyboardType="numeric"
            value={zip}
            onChangeText={(text) => setZip(text)}
          />
          <TouchableOpacity
            className="bg-black rounded-lg h-14 flex items-center justify-center"
            onPress={handleAddress}
          >
            <Text className="text-center text-white font-semibold">
              Save Address
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAddress;
