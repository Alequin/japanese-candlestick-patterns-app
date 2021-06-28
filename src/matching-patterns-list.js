import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NEUTRAL } from "./candle-types";
import { doubleCandlePatterns, singleCandlePatterns } from "./patterns";

export const MatchingPattersList = ({ candlesShapes }) => {
  const patternNames = getMatchingPatterns(candlesShapes).map(
    ({ name }) => name
  );
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

const getMatchingPatterns = (candlesShapes) => {
  if (candlesShapes.length === 1) {
    const candleToCheck = candlesShapes[0];
    return singleCandlePatterns.filter(({ doesCandlesMatchPattern }) =>
      doesCandlesMatchPattern(candleToCheck)
    );
  }
  if (candlesShapes.length === 2) {
    return doubleCandlePatterns.filter(({ doesCandlesMatchPattern }) =>
      doesCandlesMatchPattern(candlesShapes)
    );
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
