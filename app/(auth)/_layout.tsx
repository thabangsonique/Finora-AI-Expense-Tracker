import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function AuthLayout() {
  // conditional redirect.
  const { isSignedIn, isLoaded } = useAuth();

  console.log(
    "AUTH LAYOUT:",
    "isLoaded =",
    isLoaded,
    "isSignedIn =",
    isSignedIn,
  );

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)"} />;
  }
  return <Slot screenOptions={{ headerShown: false }} />; // stacks screens ontop of eachother
}
