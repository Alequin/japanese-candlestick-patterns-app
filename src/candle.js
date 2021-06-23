import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export const Candle = ({
  isCandleValid,
  candleShapeDetails: {
    isBullish,
    topStickHeightPercentage,
    bodyHeightPercentage,
    bottomStickHeightPercentage,
  },
}) => {
  return isCandleValid ? (
    <View style={styles.candleContainer}>
      <CandleStick height={`${topStickHeightPercentage}%`} />
      <CandleBody height={`${bodyHeightPercentage}%`} isBullish={isBullish} />
      <CandleStick height={`${bottomStickHeightPercentage}%`} />
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

  return <View style={style}></View>;
};

const CandleBody = ({ height, isBullish }) => {
  const style = useMemo(
    () => ({
      ...styles.body,
      height: height || 0,
      backgroundColor: isBullish ? "green" : "red",
    }),
    [height]
  );

  return <View style={style}></View>;
};

const styles = StyleSheet.create({
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
