import Constants from "expo-constants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CandleInputs } from "./src/candle-inputs";
import { CandleView } from "./src/candle-view";
import { MatchingPattersList } from "./src/matching-patterns-list";
import { singleCandlePatterns } from "./src/patterns";
import { useCandleShape } from "./src/use-candle-shape";

export default function App() {
  const [numberOfCandles, setNumberOfCandles] = useState(3);
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const candlesShapes = useCandleShape(numberOfCandles);

  const activeCandle = candlesShapes[activeCandleIndex];

  return (
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
  );
}

const toNumber = (value) => {
  const valueAsNumber = Number(value);
  return valueAsNumber ? valueAsNumber : 0;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: Constants.statusBarHeight + 10,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "90%",
  },
  candleDetailsContainer: {
    height: "60%",
    width: "100%",
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputsContainer: {
    height: "30%",
    minHeight: 250,
  },
});
