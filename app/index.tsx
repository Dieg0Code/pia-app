import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { IconButton } from "react-native-paper";
import { theme } from "@/src/core/constants/theme";
import AuthErrorModal from "@/src/presentation/components/AuthErrorModal";
import * as LocalAuthentication from "expo-local-authentication";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setShowModal(true);

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isBiometricSupported = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isBiometricSupported) {
        setIconColor(theme.error);
        setErrorMessage(
          "La autenticación biométrica no es compatible con este dispositivo."
        );
        setErrorModal(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint",
        fallbackLabel: "Use password",
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setIconColor(theme.warning);
        setErrorMessage("La autenticación falló.");
        setErrorModal(true);
      }
    } catch (error) {
      setIconColor(theme.error);
      setErrorMessage("Ocurrió un error durante la autenticación.");
      setErrorModal(true);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="fingerprint"
        iconColor={theme.primary}
        size={100}
        onPress={handleAuth}
      />
      <Text style={styles.text}>
        {loading ? "Loading..." : "Autenticación requerida"}
      </Text>
      <AuthErrorModal
        iconColor={iconColor}
        visible={errorModal}
        onClose={() => setErrorModal(false)}
        message={errorMessage}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.black,
  },
  text: {
    color: theme.textPrimary,
    alignSelf: "center",
  },
});
