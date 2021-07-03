import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation";
import { AdMobBanner } from "expo-ads-admob";

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
};

const AdBanner = () => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "black",
        width: "100%",
        marginTop: 10,
      }}
    >
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false} // true or false
      />
    </View>
  );
};

export default App;
