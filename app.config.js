import "dotenv/config";

export default {
  expo: {
    name: "app-pia",
    owner: "dieg0code",
    slug: "app-pia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FCFEFD",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      // softwareKeyboardLayoutMode: "pan",
      package: "com.dieg0code.apppia",
      permissions: ["INTERNET"],
      androidStatusBar: {
        barStyle: "dark-content",
        backgroundColor: "#0D0D0D",
      },
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FCFEFD",
      },
    },
    web: {
      bundler: "metro",
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      eas: {
        projectId: "b5953624-d62d-4be4-99f7-ccf932588687",
      },
    },
  },
};
