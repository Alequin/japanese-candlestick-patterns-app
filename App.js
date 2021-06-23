import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Candle } from "./src/candle";
import { CandleInputs } from "./src/candle-inputs";
import { useCandleShape } from "./src/use-candle-shape";

export default function App() {
  const [high, setHigh] = useState("0");
  const [close, setClose] = useState("0");
  const [open, setOpen] = useState("0");
  const [low, setLow] = useState("0");

  const { isCandleValid, ...candleShapeDetails } = useCandleShape({
    high: toNumber(high),
    low: toNumber(low),
    open: toNumber(open),
    close: toNumber(close),
  });

  return (
    <View style={styles.container}>
      <Candle
        isCandleValid={isCandleValid}
        candleShapeDetails={candleShapeDetails}
      />
      <CandleInputs
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
  );
}

const toNumber = (value) => {
  const valueAsNumber = Number(value);
  return valueAsNumber ? valueAsNumber : 0;
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  candleContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stick: {
    borderWidth: 1,
    borderColor: "black",
    height: "25%",
  },
  body: {
    width: "10%",
    height: "50%",
  },
});
