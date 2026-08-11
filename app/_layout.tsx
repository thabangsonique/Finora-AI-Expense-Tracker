import "../global.css";
import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

export default function _layout() {
  return <Slot />; //decides the screen that will be rendered in our entire app
}
