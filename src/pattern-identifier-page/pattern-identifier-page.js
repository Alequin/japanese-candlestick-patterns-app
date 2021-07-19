import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useCandleShape } from "../use-candle-shape";
import { CandleInputs } from "./components/candle-inputs";
import { Identifier } from "./components/identifier";
import { Dimensions } from "react-native";
import { useIsKeyboardVisible } from "../use-is-keyboard-visible";
import { windowHeight } from "../dimensions";

export const PatternIdentifierPage = () => {
  const [numberOfCandles, setNumberOfCandles] = useState(1);
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const candlesShapes = useCandleShape(numberOfCandles);

  const activeCandle = candlesShapes[activeCandleIndex];

  const shouldHideIdentifier = useIsKeyboardVisible() && windowHeight() < 600;

  return (
    <View testID="patternIdentifierPage" style={styles.page}>
      <View style={styles.container}>
        {!shouldHideIdentifier && (
          <View style={styles.candleDetailsContainer}>
            <Identifier
              candlesShapes={candlesShapes}
              activeCandleIndex={activeCandleIndex}
              onSelectCandle={(newIndex) => setActiveCandleIndex(newIndex)}
              addCandle={() => setNumberOfCandles(numberOfCandles + 1)}
              removeCandle={() => {
                const newCount = numberOfCandles - 1;
                setNumberOfCandles(newCount);
                if (activeCandleIndex >= newCount)
                  setActiveCandleIndex(newCount - 1);
              }}
            />
          </View>
        )}
        <View style={styles.inputsContainer}>
          <CandleInputs activeCandle={activeCandle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "90%",
    justifyContent: "space-between",
  },
  candleDetailsContainer: {
    height: "60%",
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputsContainer: {
    height: "30%",
    minHeight: 100,
  },
});
