import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import { View } from "react-native";

export const AdBanner = () => {
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
