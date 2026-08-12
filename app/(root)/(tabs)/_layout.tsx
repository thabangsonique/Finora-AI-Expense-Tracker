import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Platform, View } from "react-native";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const useNativeTabs = Platform.OS === "ios";

export default function TabLayout() {
  if (useNativeTabs)
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="transections">
          <Label>Transections</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="add-transection">
          <Label>Add</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="assistent">
          <Label>Assistent</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Label>Profile</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transections"
        options={{
          title: "Transections",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transection"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <View className="rounded-full bg-white shadow-lg h-20 w-20 flex items-center justify-center p-2">
              <View className="flex items-center justify-center rounded-full bg-blue-300/30 h-full w-full">
                <Feather name="plus" color={color} size={size} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="assistent"
        options={{
          title: "Assistent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
