import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NEUTRAL } from "./candle-types";
import { patterns } from "./patterns";

export const MatchingPattersList = ({ activeCandle }) => {
  const singleCandlePatterNames = patterns
    .filter(
      ({ doesCandleMatchPatten, candleType }) =>
        doesCandleMatchPatten(activeCandle) &&
        (candleType === NEUTRAL || activeCandle.candleType === candleType)
    )
    .map(({ name }) => name);

  return (
    <View>
      <Text>Matching Single Candle Patterns</Text>
      {!isEmpty(singleCandlePatterNames) ? (
        singleCandlePatterNames.map((name) => <Text key={name}>{name}</Text>)
      ) : (
        <Text>No matching patterns</Text>
      )}
    </View>
  );
};

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

const styles = StyleSheet.create({});
