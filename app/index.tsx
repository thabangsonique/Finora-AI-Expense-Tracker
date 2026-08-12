import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function index() {
  return <Redirect href={"/sign-in"} />;
}
