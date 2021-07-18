import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/ad-banner";
import { BottomTabNavigator } from "./src/navigation/bottom-tab-navigator";
import { StatusBarPlaceholder } from "./src/status-bar-placeholder";

export const App = () => (
  <>
    <NavigationContainer>
      <StatusBarPlaceholder />
      <BottomTabNavigator />
    </NavigationContainer>
    <AdBanner />
  </>
);

const AppWithinSafeArea = () => (
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>
);

export default AppWithinSafeArea;
