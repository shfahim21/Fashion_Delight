import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View className="justify-center items-center py-1">
      <Ionicons
        name={focused ? iconName : `${iconName}-outline`}
        size={24}
        color={color}
      />
      <Text
        className={`${focused ? "font-bold" : "font-normal"} text-[10px] mt-1`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="home"
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="grid"
              color={color}
              name="Category"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="cart"
              color={color}
              name="Cart"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="person"
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
