import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NEUTRAL } from "./candle-types";
import { singleCandlePatterns } from "./patterns";

export const MatchingPattersList = ({ candlesShapes }) => {
  const patternNames = getPatternNames(candlesShapes);
  return (
    <View>
      <Text>{title(candlesShapes.length)}</Text>
      {!isEmpty(patternNames) ? (
        patternNames.map((name) => <Text key={name}>{name}</Text>)
      ) : (
        <Text>No matching patterns</Text>
      )}
    </View>
  );
};

const getPatternNames = (candlesShapes) => {
  if (candlesShapes.length === 1) {
    const candleToCheck = candlesShapes[0];
    return singleCandlePatterns
      .filter(({ doesCandlesMatchPattern }) =>
        doesCandlesMatchPattern(candleToCheck)
      )
      .map(({ name }) => name);
  }
};

const title = (candleCount) => {
  if (candleCount === 1) return "Single Candle Patterns";
  if (candleCount === 2) return "Double Candle Patterns";
  if (candleCount === 3) return "Triple Candle Patterns";
  throw new Error(
    "candle count is not valid. No pattern title can be shown: " + candleCount
  );
};

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

const styles = StyleSheet.create({});
