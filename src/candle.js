import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { BULLISH } from "./candle-types";

export const Candle = ({
  isCandleValid,
  candleShapeDetails: {
    candleType,
    topStickHeightPercentage,
    bodyHeightPercentage,
    bottomStickHeightPercentage,
  },
}) => {
  console.log("🚀 ~ file: candle.js ~ line 14 ~ candleType", candleType);
  return isCandleValid ? (
    <View style={styles.candleContainer}>
      {topStickHeightPercentage > 0 ? (
        <CandleStick height={`${topStickHeightPercentage}%`} />
      ) : null}
      {bodyHeightPercentage > 0 ? (
        <CandleBody
          height={`${bodyHeightPercentage}%`}
          candleType={candleType}
          isBullish={candleType === BULLISH}
        />
      ) : null}
      {bottomStickHeightPercentage > 0 ? (
        <CandleStick height={`${bottomStickHeightPercentage}%`} />
      ) : null}
    </View>
  ) : (
    <View style={styles.candleContainer}>
      <CandleStick height="10%" />
      <CandleBody height="1%" isBullish />
      <CandleStick height="10%" />
    </View>
  );
};

const CandleStick = ({ height }) => {
  const style = useMemo(
    () => ({ ...styles.stick, height: height || 0 }),
    [height]
  );

  return <View style={style} />;
};

const CandleBody = ({ height, isBullish }) => {
  console.log(
    "🚀 ~ file: candle.js ~ line 49 ~ CandleBody ~ isBullish",
    isBullish
  );
  const style = useMemo(
    () => ({
      ...styles.body,
      height: height || 0,
      backgroundColor: isBullish ? "green" : "red",
    }),
    [height]
  );

  return <View style={style} />;
};

const styles = StyleSheet.create({
  candleContainer: {
    height: "100%",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "white",
  },
  stick: {
    borderWidth: 1,
    borderColor: "black",
    height: "25%",
  },
  body: {
    width: "100%",
    height: "50%",
  },
});
