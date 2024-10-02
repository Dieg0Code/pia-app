import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/src/core/constants/theme";

const UserMessagesPage = () => {
  return (
    <View style={styles.container}>
      <Text>UserMessagesPage</Text>
    </View>
  );
};

export default UserMessagesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
  },
});
