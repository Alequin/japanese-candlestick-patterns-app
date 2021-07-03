import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BULLISH } from "./candle-types";

export const Candle = ({
  candleShapeDetails: {
    error,
    index,
    isActive,
    candleType,
    topSpaceHeightPercentage,
    topStickHeightPercentage,
    bodyHeightPercentage,
    bottomStickHeightPercentage,
    bottomSpaceHeightPercentage,
  },
  onSelectCandle,
}) => {
  const isCandleValid = !error;

  return (
    <TouchableOpacity
      style={useMemo(
        () => ({
          ...styles.candleContainer,
          opacity: isActive ? 1 : 0.5,
        }),
        [isActive]
      )}
      onPress={() => onSelectCandle(index)}
    >
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
    </TouchableOpacity>
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
    width: "25%",
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
