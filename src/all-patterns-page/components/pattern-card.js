import * as React from "react";
import { Text, View } from "react-native";
import { Candle } from "../../candle";
import { Button } from "../../shared-components/button";

export const PatternCard = ({ name, exampleCandles, onPress }) => {
  return (
    <Button
      style={{
        alignItems: "center",
        padding: 10,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: "100%",
          height: 75,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {exampleCandles.map((candleDetails, index) => (
          <View
            key={index}
            style={{
              height: "100%",
              width: "25%",
              maxWidth: 30,
              margin: 2,
            }}
          >
            <Candle candleShapeDetails={candleDetails} />
          </View>
        ))}
      </View>
      <Text>{name}</Text>
    </Button>
  );
};
