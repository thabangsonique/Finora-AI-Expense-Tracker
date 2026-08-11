import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

export default function index() {
  //conditionals.
  //if user is not signed-in. take them to the sign-ip page. else take them to the sign-in page
  return <Redirect href={"/(root)/(tabs)"} />;
  //   return <Redirect href={"/sign-in"} />;
}
