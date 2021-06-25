import Constants from "expo-constants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Candle } from "./src/candle";
import { CandleInputs } from "./src/candle-inputs";
import { useCandleShape } from "./src/use-candle-shape";

export default function App() {
  const [numberOfCandles, setNumberOfCandles] = useState(2);

  const { candlesShapes, activeCandle, error } =
    useCandleShape(numberOfCandles);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.candleContainer}>
          {candlesShapes.map((candleShapeDetails, index) => (
            <Candle
              key={index}
              isCandleValid={!error}
              candleShapeDetails={candleShapeDetails}
            />
          ))}
        </View>
        <View style={styles.inputsContainer}>
          <CandleInputs error={error} activeCandle={activeCandle} />
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
  candleContainer: {
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
