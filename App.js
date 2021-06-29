import { AdMobBanner } from "expo-ads-admob";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { CandleInputs } from "./src/candle-inputs";
import { CandleView } from "./src/candle-view";
import { MatchingPattersList } from "./src/matching-patterns-list";
import { useCandleShape } from "./src/use-candle-shape";

export default function App() {
  const [numberOfCandles, setNumberOfCandles] = useState(3);
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const candlesShapes = useCandleShape(numberOfCandles);

  const activeCandle = candlesShapes[activeCandleIndex];

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.statusBarPlaceholder} />
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.candleDetailsContainer}>
            <View style={{ flex: 2 }}>
              <MatchingPattersList candlesShapes={candlesShapes} />
            </View>
            <View
              style={{
                flex: 1.5,
              }}
            >
              <CandleView
                candlesShapes={candlesShapes.map((candle) => ({
                  ...candle,
                  isActive: candle.index === activeCandleIndex,
                }))}
                addCandle={() => {
                  const newCount = numberOfCandles + 1;
                  if (newCount <= 3) setNumberOfCandles(newCount);
                }}
                removeCandle={() => {
                  const newCount = numberOfCandles - 1;
                  if (newCount >= 1) {
                    setNumberOfCandles(newCount);
                    if (activeCandleIndex >= newCount)
                      setActiveCandleIndex(newCount - 1);
                  }
                }}
                onSelectCandle={setActiveCandleIndex}
              />
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <CandleInputs activeCandle={activeCandle} />
          </View>
        </View>
        <AdBanner />
      </View>
    </View>
  );
}

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

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    height: Constants.statusBarHeight + 10,
  },
  page: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "90%",
  },
  candleDetailsContainer: {
    flex: 5,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputsContainer: {
    flex: 1,
    minHeight: 100,
  },
});
