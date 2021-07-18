import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { doubleCandlePatterns, singleCandlePatterns } from "../../patterns";
import { Button, ButtonText } from "../../shared-components/button";

export const MatchingPattersList = ({
  candlesShapes,
  onSelectMatchingPattern,
}) => {
  const patternNames = getMatchingPatterns(candlesShapes).map(
    ({ name }) => name
  );

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {title(candlesShapes.length)}
      </Text>
      {!isEmpty(patternNames) ? (
        patternNames.map((name) => (
          <Button
            key={name}
            style={{ padding: 5, margin: 5, textAlign: "center" }}
            onPress={() => onSelectMatchingPattern(name)}
          >
            <ButtonText>{name}</ButtonText>
          </Button>
        ))
      ) : (
        <Text style={{ textAlign: "center" }}>No matching patterns</Text>
      )}
    </View>
  );
};

const getMatchingPatterns = (candlesShapes) => {
  if (candlesShapes.length === 1) {
    const candleToCheck = candlesShapes[0];
    return singleCandlePatterns.filter(({ doCandlesMatchPattern }) =>
      doCandlesMatchPattern(candleToCheck)
    );
  }
  if (candlesShapes.length === 2) {
    return doubleCandlePatterns.filter(({ doCandlesMatchPattern }) =>
      doCandlesMatchPattern(candlesShapes)
    );
  }
  if (candlesShapes.length === 3) {
    return [];
  }
  throw new Error("Candle length is not valid: " + candlesShapes.length);
};

const title = (candleCount) => {
  if (candleCount === 1) return "Single CandleStick Patterns";
  if (candleCount === 2) return "Double CandleStick Patterns";
  if (candleCount === 3) return "Triple CandleStick Patterns";
  throw new Error(
    "candle count is not valid. No pattern title can be shown: " + candleCount
  );
};

const styles = StyleSheet.create({});
