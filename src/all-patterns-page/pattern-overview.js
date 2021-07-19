import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AccessibleTouchableOpacity } from "../components/accessible-touchable-opacity";
import { Candle } from "../components/candle";
import { Header } from "../components/header";
import { Icon } from "../components/icon";
import { useOnPressBackButton } from "../use-on-press-back-button";
import { PatternContent, patternContent } from "./components/patterns-content";

export const PatternOverview = ({
  pattern: { name, exampleCandles },
  onPressBack,
}) => {
  useOnPressBackButton(() => {
    if (!onPressBack) return false;
    onPressBack();
    return true;
  }, [onPressBack]);

  return (
    <View testID="patternOverviewPage" style={patternOverviewStyles.container}>
      <AccessibleTouchableOpacity
        style={patternOverviewStyles.backArrowContainer}
        onPress={onPressBack}
      >
        <Icon name="arrowBack" size={27} />
        <Text style={patternOverviewStyles.backArrowText}>
          Back to all patterns
        </Text>
      </AccessibleTouchableOpacity>
      <Header style={patternOverviewStyles.header}>{name}</Header>
      <ExampleCandlesView exampleCandles={exampleCandles} />
      <ScrollView style={patternOverviewStyles.contentContainer}>
        <PatternContent patternName={name} />
      </ScrollView>
    </View>
  );
};

const ExampleCandlesView = ({ exampleCandles }) => (
  <View style={exampleCandlesStyles.container}>
    {exampleCandles.map((candleDetails, index) => (
      <View key={index} style={exampleCandlesStyles.candleContainer}>
        <Candle candleShapeDetails={candleDetails} />
      </View>
    ))}
  </View>
);

const patternOverviewStyles = StyleSheet.create({
  container: { height: "100%", alignItems: "center", paddingHorizontal: 5 },
  backArrowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  backArrowText: { marginLeft: 3 },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
  },
  contentContainer: { width: "100%", paddingHorizontal: 15 },
});

const exampleCandlesStyles = StyleSheet.create({
  container: {
    height: "30%",
    maxHeight: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  candleContainer: { width: 30, margin: 2, height: "100%" },
});
