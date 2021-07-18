import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Candle } from "../candle";
import { useOnPressBackButton } from "../use-on-press-back-button";
import { Icon } from "../icon";

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
      style={{ height: "100%", alignItems: "center", paddingHorizontal: 5 }}
    >
      <TouchableOpacity
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        onPress={onPressBack}
      >
        <Icon name="arrowBack" size={30} />
        <Text style={{ marginLeft: 3 }}>Back to all patterns</Text>
      </TouchableOpacity>
      <Title>{name}</Title>
      <ExampleCandlesView exampleCandles={exampleCandles} />
      <ScrollView style={{ width: "100%", paddingHorizontal: 15 }}>
        {content}
      </ScrollView>
    </View>
  );
};

const Title = (props) => (
  <Text
    style={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 26,
    }}
    {...props}
  />
);

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
