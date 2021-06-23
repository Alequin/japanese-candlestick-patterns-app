import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Candle } from "./src/candle";
import { CandleInputs } from "./src/candle-inputs";
import { useCandleShape } from "./src/use-candle-shape";

export default function App() {
  const [high, setHigh] = useState("1");
  const [close, setClose] = useState("1");
  const [open, setOpen] = useState("1");
  const [low, setLow] = useState("1");

  const { error, ...candleShapeDetails } = useCandleShape({
    high: toNumber(high),
    low: toNumber(low),
    open: toNumber(open),
    close: toNumber(close),
  });

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.candleContainer}>
          <Candle
            isCandleValid={!error}
            candleShapeDetails={candleShapeDetails}
          />
        </View>
        <View style={styles.inputsContainer}>
          <CandleInputs
            error={error}
            high={high}
            setHigh={setHigh}
            low={low}
            setLow={setLow}
            open={open}
            setOpen={setOpen}
            close={close}
            setClose={setClose}
          />
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
    marginVertical: 15,
  },
  inputsContainer: {
    height: "30%",
  },
});
