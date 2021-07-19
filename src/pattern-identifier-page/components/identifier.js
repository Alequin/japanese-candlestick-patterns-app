import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PAGES } from "../../navigation/pages";
import { CandleView } from "./candle-view";
import { HelpIcon } from "./help-icon";
import { MatchingPattersList } from "./matching-patterns-list";

export const Identifier = ({
  candlesShapes,
  activeCandleIndex,
  addCandle,
  removeCandle,
  onSelectCandle,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <View>
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
      <View style={styles.candleViewContainer}>
        <HelpIcon />

        <CandleView
          candlesShapes={candlesShapes.map((candle) => ({
            ...candle,
            isActive: candle.index === activeCandleIndex,
          }))}
          addCandle={addCandle}
          removeCandle={removeCandle}
          onSelectCandle={onSelectCandle}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  candleViewContainer: {
    flex: 1.5,
  },
});
