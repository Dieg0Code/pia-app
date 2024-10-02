import { View, Text } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
};

export default RootLayout;
