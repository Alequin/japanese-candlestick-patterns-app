import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/components/ad-banner";
import { StatusBarPlaceholder } from "./src/components/status-bar-placeholder";
import { BottomTabNavigator } from "./src/navigation/bottom-tab-navigator";

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
