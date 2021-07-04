import React from "react";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Candle } from "../../candle";
import { Button, ButtonText } from "../../shared-components/button";

export const CandleView = ({
  candlesShapes,
  addCandle,
  removeCandle,
  onSelectCandle,
}) => {
  return (
    <>
      <View
        style={{
          width: "100%",
          flex: 1,
          marginBottom: 10,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {candlesShapes.map((candleShapeDetails, index) => (
          <TouchableOpacity
            key={`${index}-${candleShapeDetails.isActive}`} // Use isActive in key so it updates when state updates
            style={{
              opacity: candleShapeDetails.isActive ? 1 : 0.5,
              width: "25%",
            }}
            onPress={() => onSelectCandle(candleShapeDetails.index)}
          >
            <Candle candleShapeDetails={candleShapeDetails} />
          </TouchableOpacity>
        ))}
      </View>

      <Button style={{ padding: 5, margin: 5 }} onPress={addCandle}>
        <ButtonText>Add Candle</ButtonText>
      </Button>
      <Button style={{ padding: 5, margin: 5 }} onPress={removeCandle}>
        <ButtonText>Remove Candle</ButtonText>
      </Button>
    </>
  );
};
