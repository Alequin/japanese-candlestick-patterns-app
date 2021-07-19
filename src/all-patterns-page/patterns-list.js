import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { PatternCard } from "./components/pattern-card";
import { columnCount } from "./utils/column-count";
import { patternsToRenderInList } from "./utils/patterns-to-render-in-list";

export const PatternsList = ({ onSelectPattern, onScroll, listRef }) => {
  const listColumns = useMemo(() => columnCount());

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

const styles = StyleSheet.create({
  list: { paddingHorizontal: 10 },
  patternCardWrapper: {
    flex: 1,
    margin: 5,
  },
});
