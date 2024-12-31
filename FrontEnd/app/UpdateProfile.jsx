import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const UpdateProfile = () => {
  const userData = {
    _id: "64a1f5e1c4a8b204d6789102",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    password: "$2a$12$hashedpassword456",
    phone: "+14155550456",
    profilePicture: "https://picsum.photos/200",
    dateOfBirth: "1988-07-22T00:00:00Z",
    address: [
      {
        street: "456 Innovation Street",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA",
      },
    ],
    wishlist: [
      { productId: "64b2e4f2d3a7c812e6f78905" },
      { productId: "64b2e4f2d3a7c812e6f78907" },
    ],
    cart: [{ productId: "64b2e4f2d3a7c812e6f78904", quantity: 2 }],
    role: "customer",
    createdAt: "2023-11-15T09:20:30Z",
    updatedAt: "2023-12-17T11:30:00Z",
  };
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    profilePicture: userData.profilePicture,
    address: userData.address[0], // Assuming only one address to edit
    dateOfBirth: userData.dateOfBirth,
    wishlist: userData.wishlist,
    cart: userData.cart,
    role: userData.role,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddressChange = (key, value) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [key]: value },
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <ScrollView className={`p-6 bg-gray-100 flex-grow mt-5`}>
      <View className={`flex-1 justify-center`}>
        <Text className={`text-2xl font-bold text-center`}>Update Profile</Text>

        <View
        // className={`border-4 border-black rounded-full w-28 h-28 self-center mt-5 mb-4`}
        >
          <Image
            source={{ uri: formData.profilePicture }}
            className={`w-24 h-24 rounded-full self-center mb-6`}
          />
        </View>

        <Text className={`text-lg font-semibold mb-2`}>
          Profile Picture URL:
        </Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-lg mb-4`}
          value={formData.profilePicture}
          onChangeText={(value) => handleInputChange("profilePicture", value)}
        />

        <Text className={`text-lg font-semibold mb-2`}>Name:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-lg mb-4`}
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />

        <Text className={`text-lg font-semibold mb-2`}>Email:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-lg mb-4`}
          value={formData.email}
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <Text className={`text-lg font-semibold mb-2`}>Phone:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-lg mb-4`}
          value={formData.phone}
          keyboardType="phone-pad"
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <Text className={`text-lg font-semibold mb-2`}>Date of Birth:</Text>
        <TextInput
          className={`border border-gray-300 p-3 rounded-lg mb-4`}
          value={formData.dateOfBirth}
          onChangeText={(value) => handleInputChange("dateOfBirth", value)}
        />

        <View className={`mt-4 mb-10 rounded-full`}>
          <TouchableOpacity
            onPress={handleSubmit}
            className={`bg-black py-2 px-4 rounded-full`}
          >
            <Text
              className={`text-lg font-semibold text-white py-2 px-4 text-center`}
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
