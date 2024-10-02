import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/src/core/constants/theme";

const AssistantPage = () => {
  return (
    <View style={styles.container}>
      <Text>AssistantPage</Text>
    </View>
  );
};

export default AssistantPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
  },
});
