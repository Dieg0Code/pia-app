import { View, Text } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { Slot } from "expo-router";
import { theme } from "@/src/core/constants/theme";
import { setBackgroundColorAsync } from "expo-system-ui";

const RootLayout = () => {
  setBackgroundColorAsync(theme.background);
  return (
    <PaperProvider>
      <Slot
        screenOptions={{
          background: theme.background,
        }}
      />
    </PaperProvider>
  );
};

export default RootLayout;
