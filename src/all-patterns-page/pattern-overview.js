import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Candle } from "../candle";

export const PatternOverview = ({
  pattern: { name, exampleCandles, content },
}) => {
  return (
    <View
      style={{ height: "100%", alignItems: "center", paddingHorizontal: 20 }}
    >
      <Title>{name}</Title>
      <ExampleCandlesView exampleCandles={exampleCandles} />
      <ScrollView style={{ width: "100%", padding: 3 }}>{content}</ScrollView>
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
      alignItems: "center",
    }}
  >
    {exampleCandles.map((candleDetails, index) => (
      <View key={index} style={{ width: 30, margin: 2 }}>
        <Candle candleShapeDetails={candleDetails} />
      </View>
    ))}
  </View>
);
