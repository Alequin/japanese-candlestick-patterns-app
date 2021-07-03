import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AdBanner } from "./src/ad-banner";
import Navigation from "./src/navigation";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Navigation />
      <AdBanner />
    </SafeAreaProvider>
  );
};

export default App;
