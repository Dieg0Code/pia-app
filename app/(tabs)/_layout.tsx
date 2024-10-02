import { View, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  ChatIcon,
  DBIcon,
  QuestionIcon,
  RobotIcon,
} from "../../src/presentation/components/Icons";
import { theme } from "@/src/core/constants/theme";

const TabsLayout = () => {
  return (
    <View style={styles.container}>
      <Tabs
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0D0D0D",
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: theme.title,
          tabBarStyle: {
            position: "absolute", // Para ponerlo sobre la pantalla
            bottom: 10, // Ajusta la posición según tu diseño
            left: 20,
            right: 20,
            borderRadius: 20,
            backgroundColor: "#0D0D0D",
            borderTopWidth: 0,
            zIndex: 10, // Para asegurarse de que esté encima del contenido
          },
          tabBarActiveTintColor: theme.primary,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Registros",
            tabBarIcon: ({ color }) => <DBIcon color={color} />,
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="AddRegister"
          options={{
            title: "Preguntas Frecuentes",
            tabBarIcon: ({ color }) => <QuestionIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="UserMessages"
          options={{
            title: "Historial de mensajes",
            tabBarIcon: ({ color }) => <ChatIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="Assistant"
          options={{
            title: "PIA",
            tabBarIcon: ({ color }) => <RobotIcon color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
});

export default TabsLayout;
