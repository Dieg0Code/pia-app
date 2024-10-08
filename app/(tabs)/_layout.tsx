import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs, useNavigation } from "expo-router";
import {
  AddIcon,
  BrainIcon,
  ChatIcon,
  DBIcon,
  QuestionIcon,
  RobotIcon,
} from "../../src/presentation/components/Icons";
import { theme } from "@/src/core/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  ChatHistoryIcon,
  PiaIcon,
} from "../../src/presentation/components/Icons";

const TabsLayout = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tabs
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: theme.title,
          tabBarStyle: {
            position: "absolute",
            bottom: 10,
            left: 20,
            right: 20,
            borderRadius: 20,
            backgroundColor: "#0D0D0D",
            borderTopWidth: 0,
            zIndex: 10,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Registros",
            tabBarIcon: ({ color }) => <BrainIcon color={color} />,
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="AddRegister"
          options={{
            title: "Preguntas Frecuentes",
            tabBarIcon: ({ color }) => <AddIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="UserMessages"
          options={{
            title: "Historial de mensajes",
            tabBarIcon: ({ color }) => <ChatHistoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="Assistant"
          options={{
            title: "PIA",
            tabBarIcon: ({ color }) => <PiaIcon color={color} />,
            tabBarStyle: { display: "none" },
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={theme.title} // Usa el color de tu tema
                  style={{ marginLeft: 15 }} // Ajusta el margen según tu diseño
                />
              </TouchableOpacity>
            ),
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
