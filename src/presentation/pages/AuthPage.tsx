// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import * as LocalAuthentication from "expo-local-authentication";
// import AuthErrorModal from "../components/AuthErrorModal";
// import { Redirect } from "expo-router";
// import { theme } from "@/src/core/constants/theme";
// import { IconButton } from "react-native-paper";

// const AuthPage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [errorModal, setErrorModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleAuth = async () => {
//     setLoading(true);
//     setShowModal(true);

//     try {
//       const hasHardware = await LocalAuthentication.hasHardwareAsync();
//       const isBiometricSupported = await LocalAuthentication.isEnrolledAsync();

//       if (!hasHardware || !isBiometricSupported) {
//         <AuthErrorModal
//           visible={errorModal}
//           onClose={() => setErrorModal(false)}
//           message="Biometric authentication is not supported on this device."
//         />;
//       }

//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: "Authenticate with your fingerprint",
//         fallbackLabel: "Use password",
//       });

//       if (result.success) {
//         setIsAuthenticated(true);
//       } else {
//         setErrorModal(true);
//         <AuthErrorModal
//           visible={errorModal}
//           onClose={() => setErrorModal(false)}
//           message="Authentication failed."
//         />;
//       }
//     } catch (error) {
//       setErrorModal(true);
//       <AuthErrorModal
//         visible={errorModal}
//         onClose={() => setErrorModal(false)}
//         message="An error occurred during authentication."
//       />;
//     } finally {
//       setLoading(false);
//       setShowModal(false);
//     }

//     if (isAuthenticated) {
//       return <Redirect href="/(tabs)/Home" />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <IconButton
//         icon="fingerprint"
//         iconColor={theme.primary}
//         size={100}
//         onPress={handleAuth}
//       />
//     </View>
//   );
// };

// export default AuthPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: theme.black,
//   },
// });
