import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { allPatterns } from "../patterns";
import { PatternCard } from "./components/pattern-card";

export const PatternsList = ({ onSelectPattern, onScroll, listRef }) => {
  const listColumns = columnCount();

  return (
    <FlatList
      testID="patternListPage"
      ref={listRef}
      style={styles.list}
      onScroll={onScroll}
      data={useMemo(() => patternsToRenderInList(listColumns), [listColumns])}
      numColumns={listColumns}
      renderItem={({ item: pattern }, index) =>
        !pattern.isBlankItem ? (
          <View key={pattern.name} style={styles.patternCardWrapper}>
            <PatternCard
              name={pattern.name}
              exampleCandles={pattern.exampleCandles}
              onPress={() => onSelectPattern(pattern.name)}
            />
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
  list: { paddingHorizontal: 10 },
  patternCardWrapper: {
    flex: 1,
    margin: 5,
  },
});
