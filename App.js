import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/ad-banner";
import { BottomTabNavigator } from "./src/navigation/bottom-tab-navigator";
import { StatusBarPlaceholder } from "./src/status-bar-placeholder";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <StatusBarPlaceholder />
        <BottomTabNavigator />
      </NavigationContainer>
      <AdBanner />
    </SafeAreaProvider>
  );
};

export default App;
