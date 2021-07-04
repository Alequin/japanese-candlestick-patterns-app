import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { allPatterns } from "../patterns";
import { PatternCard } from "./components/pattern-card";

export const AllPatternsPage = ({ route }) => {
  const listColumns = columnCount();

  return (
    <FlatList
      style={{ paddingHorizontal: 10 }}
      data={useMemo(() => patternsToRenderInList(listColumns), [listColumns])}
      numColumns={listColumns}
      renderItem={({ item: { isBlankItem, name, exampleCandles } }, index) =>
        !isBlankItem ? (
          <View key={name} style={styles.patternCardWrapper}>
            <PatternCard name={name} exampleCandles={exampleCandles} />
          </View>
        ) : (
          <View key={index} style={styles.patternCardWrapper} />
        )
      }
      keyExtractor={({ name }) => name}
    />
  );
};

const patternsToRenderInList = (listColumns) => {
  const blankSpaceCount = allPatterns.length % listColumns === 0;
  return [
    ...allPatterns,
    ...new Array(blankSpaceCount).fill({ isBlankItem: true }),
  ];
};

// TODO change column count based on screen size
const columnCount = () => 2;

const styles = StyleSheet.create({
  patternCardWrapper: {
    flex: 1,
    margin: 5,
  },
});
