import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CandleView } from "./components/candle-view";
import { CandleInputs } from "./components/candle-inputs";
import { MatchingPattersList } from "./components/matching-patterns-list";
import { useCandleShape } from "../use-candle-shape";
import { PAGES } from "../navigation/bottom-tab-navigator";

export const PatternIdentifierPage = ({ navigation }) => {
  const [numberOfCandles, setNumberOfCandles] = useState(1);
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const candlesShapes = useCandleShape(numberOfCandles);

  const activeCandle = candlesShapes[activeCandleIndex];

  return (
    <View testID="patternIdentifierPage" style={{ height: "100%" }}>
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.candleDetailsContainer}>
            <View style={{ height: "70%" }}>
              <MatchingPattersList
                candlesShapes={candlesShapes}
                onSelectMatchingPattern={(name) =>
                  navigation.navigate({
                    name: PAGES.allCandlesPatterns,
                    params: {
                      patternName: name,
                    },
                  })
                }
              />
            </View>
            <View
              style={{
                flex: 1.5,
              }}
            >
              <CandleView
                candlesShapes={candlesShapes.map((candle) => ({
                  ...candle,
                  isActive: candle.index === activeCandleIndex,
                }))}
                addCandle={() => setNumberOfCandles(numberOfCandles + 1)}
                removeCandle={() => {
                  const newCount = numberOfCandles - 1;
                  setNumberOfCandles(newCount);
                  if (activeCandleIndex >= newCount)
                    setActiveCandleIndex(newCount - 1);
                }}
                onSelectCandle={setActiveCandleIndex}
              />
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <CandleInputs activeCandle={activeCandle} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "90%",
  },
  candleDetailsContainer: {
    flex: 5,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputsContainer: {
    height: "30%",
    minHeight: 100,
  },
});
