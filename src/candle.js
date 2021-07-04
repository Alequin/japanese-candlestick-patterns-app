import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { BULLISH } from "./candle-types";

export const Candle = ({
  candleShapeDetails: {
    error,
    candleType,
    topSpaceHeightPercentage,
    topStickHeightPercentage,
    bodyHeightPercentage,
    bottomStickHeightPercentage,
    bottomSpaceHeightPercentage,
  },
}) => {
  const isCandleValid = !error;

  return (
    <View style={styles.candleContainer}>
      {isCandleValid ? (
        <>
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
        </>
      ) : (
        <>
          <CandleStick heightPercentage={10} />
          <CandleBody heightPercentage={1} isBullish />
          <CandleStick heightPercentage={10} />
        </>
      )}
    </View>
  );
};

const CandleStick = ({ heightPercentage }) => {
  return (
    <View
      style={useMemo(
        () => ({
          ...styles.stick,
          height: heightPercentage ? `${heightPercentage}%` : 0,
        }),
        [heightPercentage]
      )}
    />
  );
};

const CandleBody = ({ heightPercentage, isBullish }) => {
  return (
    <View
      style={useMemo(
        () => ({
          ...styles.body,
          height: heightPercentage ? `${heightPercentage}%` : 0,
          backgroundColor: isBullish ? "green" : "red",
        }),
        [heightPercentage, isBullish]
      )}
    />
  );
};

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
