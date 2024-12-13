import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const home = () => {
  const { user } = useContext(AuthContext);
  return (
    <View className="h-10 bg-red-400 mt-52">
      <Text className="text-white h-10">{user?.email}</Text>
    </View>
  );
};

export default home;
