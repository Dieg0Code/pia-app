import { Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href="/(tabs)/Home" />;
};

export default Index;
