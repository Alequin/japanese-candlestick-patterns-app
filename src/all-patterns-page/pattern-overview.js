import React from "react";
import { ScrollView, Text, View } from "react-native";
import { AccessibleTouchableOpacity } from "../components/accessible-touchable-opacity";
import { Candle } from "../components/candle";
import { Icon } from "../components/icon";
import { Header } from "../components/header";
import { useOnPressBackButton } from "../use-on-press-back-button";

export const PatternOverview = ({
  pattern: { name, exampleCandles, content },
  onPressBack,
}) => {
  useOnPressBackButton(() => {
    if (!onPressBack) return false;
    onPressBack();
    return true;
  }, [onPressBack]);

  return (
    <View
      testID="patternOverviewPage"
      style={{ height: "100%", alignItems: "center", paddingHorizontal: 5 }}
    >
      <AccessibleTouchableOpacity
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        onPress={onPressBack}
      >
        <Icon name="arrowBack" size={30} />
        <Text style={{ marginLeft: 3 }}>Back to all patterns</Text>
      </AccessibleTouchableOpacity>
      <Header
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 26,
        }}
      >
        {name}
      </Header>
      <ExampleCandlesView exampleCandles={exampleCandles} />
      <ScrollView style={{ width: "100%", paddingHorizontal: 15 }}>
        {content}
      </ScrollView>
    </View>
  );
};

const ExampleCandlesView = ({ exampleCandles }) => (
  <View
    style={{
      height: 150,
      marginVertical: 20,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    }}
  >
    {exampleCandles.map((candleDetails, index) => (
      <View key={index} style={{ width: 30, margin: 2, height: "100%" }}>
        <Candle candleShapeDetails={candleDetails} />
      </View>
    ))}
  </View>
);
