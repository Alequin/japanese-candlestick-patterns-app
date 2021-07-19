import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { BULLISH } from "../candle-types";

export const Candle = ({
  candleShapeDetails: {
    candleType,
    topSpaceHeightPercentage,
    topStickHeightPercentage,
    bodyHeightPercentage,
    bottomStickHeightPercentage,
    bottomSpaceHeightPercentage,
  },
}) => (
  <View testID="candle" style={styles.candleContainer}>
    {topSpaceHeightPercentage > 0 ? (
      <Space heightPercentage={topSpaceHeightPercentage} />
    ) : null}
    {topStickHeightPercentage > 0 ? (
      <CandleStick
        space={topSpaceHeightPercentage}
        heightPercentage={topStickHeightPercentage}
      />
    ) : null}
    {bodyHeightPercentage > 0 ? (
      <CandleBody
        heightPercentage={bodyHeightPercentage}
        candleType={candleType}
        isBullish={candleType === BULLISH}
      />
    ) : null}
    {bottomStickHeightPercentage > 0 ? (
      <CandleStick heightPercentage={bottomStickHeightPercentage} />
    ) : null}
    {bottomSpaceHeightPercentage > 0 ? (
      <Space heightPercentage={bottomSpaceHeightPercentage} />
    ) : null}
  </View>
);

const CandleStick = ({ heightPercentage }) => (
  <View
    style={useMemo(
      () => [
        styles.candleStick,
        { height: heightPercentage ? `${heightPercentage}%` : 0 },
      ],
      [heightPercentage]
    )}
  />
);

const CandleBody = ({ heightPercentage, isBullish }) => (
  <View
    style={useMemo(
      () => [
        styles.candleBody,
        {
          height: heightPercentage ? `${heightPercentage}%` : 0,
          backgroundColor: isBullish ? "green" : "red",
        },
      ],
      [heightPercentage, isBullish]
    )}
  />
);

const Space = ({ heightPercentage }) => (
  <View
    style={useMemo(
      () => ({ height: heightPercentage ? `${heightPercentage}%` : 0 }),
      [heightPercentage]
    )}
  />
);

const styles = StyleSheet.create({
  candleContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  candleStick: {
    borderWidth: 1,
    borderColor: "black",
    height: "25%",
  },
  candleBody: {
    width: "100%",
    height: "50%",
  },
});
