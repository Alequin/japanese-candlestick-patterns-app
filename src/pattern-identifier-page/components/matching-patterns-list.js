import { isEmpty } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/header";
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
      <Header style={styles.header}>{title(candlesShapes.length)}</Header>
      {!isEmpty(patternNames) ? (
        patternNames.map((name) => (
          <Button
            key={name}
            style={styles.patternNameButtons}
            onPress={() => onSelectMatchingPattern(name)}
          >
            <ButtonText>{name}</ButtonText>
          </Button>
        ))
      ) : (
        <Text style={styles.noMatchText}>No matching patterns</Text>
      )}
    </View>
  );
};

const getMatchingPatterns = (candlesShapes) => {
  if (candlesShapes.length === 1) {
    return singleCandlePatterns.filter(({ doCandlesMatchPattern }) =>
      doCandlesMatchPattern(candlesShapes)
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

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  patternNameButtons: { padding: 5, margin: 5, textAlign: "center" },
  noMatchText: { textAlign: "center" },
});
