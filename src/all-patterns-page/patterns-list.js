import React, { useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
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
      renderItem={({ item: pattern }) =>
        !pattern.isBlankItem ? (
          <View key={pattern.name} style={styles.patternCardWrapper}>
            <PatternCard
              name={pattern.name}
              exampleCandles={pattern.exampleCandles}
              onPress={() => onSelectPattern(pattern.name)}
            />
          </View>
        ) : (
          <View key={pattern.blankIndex} style={styles.patternCardWrapper} />
        )
      }
      keyExtractor={({ name }) => name}
    />
  );
};

const patternsToRenderInList = (listColumns) => {
  const blankSpaceCount =
    listColumns <= 1 ? 0 : allPatterns.length % listColumns === 0;

  return [
    ...allPatterns,
    ...new Array(blankSpaceCount)
      .fill()
      .map((_, index) => ({ isBlankItem: true, blankIndex: index })),
  ];
};

const windowWidth = Dimensions.get("window").width;
const columnCount = () => {
  if (windowWidth < 350) return 1;
  if (windowWidth < 600) return 2;
  return 3;
};

const styles = StyleSheet.create({
  list: { paddingHorizontal: 10 },
  patternCardWrapper: {
    flex: 1,
    margin: 5,
  },
});
