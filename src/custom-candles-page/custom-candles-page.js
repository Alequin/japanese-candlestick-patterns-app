import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CandleView } from "./components/candle-view";
import { CandleInputs } from "./components/candle-inputs";
import { MatchingPattersList } from "./components/matching-patterns-list";
import { useCandleShape } from "../use-candle-shape";

export const CustomCandlesPage = () => {
  const [numberOfCandles, setNumberOfCandles] = useState(3);
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const candlesShapes = useCandleShape(numberOfCandles);

  const activeCandle = candlesShapes[activeCandleIndex];

  return (
    <View style={{ height: "100%" }}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
