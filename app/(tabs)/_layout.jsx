import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

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
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor:
            Platform.OS === "ios"
              ? "rgba(255,255,255,0.8)"
              : "rgba(255,255,255,0.9)",
          borderRadius: 30,
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
          borderWidth: 2,
          borderColor: "#F3F4F6",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          overflow: "hidden",
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={50}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            />
          ) : null,
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
