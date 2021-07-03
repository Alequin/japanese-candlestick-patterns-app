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
        <Stack.Navigator
          screenOptions={{
            header: () => <StatusBarPlaceholder />,
          }}
        >
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <AdBanner />
    </SafeAreaProvider>
  );
};

export default App;
