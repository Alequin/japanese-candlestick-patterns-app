import React from "react";
import { View } from "react-native";
import { AccessibleTouchableOpacity } from "../../components/accessible-touchable-opacity";
import { Candle } from "../../components/candle";
import { Icon } from "../../components/icon";
import { Button, ButtonText } from "../../shared-components/button";

export const CandleView = ({
  candlesShapes,
  addCandle,
  removeCandle,
  onSelectCandle,
}) => {
  const numberOfCandles = candlesShapes.length;

  return (
    <>
      <View
        testID="candleView"
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
          <AccessibleTouchableOpacity
            testID={`candleButton-${index}`}
            key={`${index}-${candleShapeDetails.isActive}`} // Use isActive in key so it updates when state updates
            style={{
              opacity: candleShapeDetails.isActive ? 1 : 0.5,
              width: "25%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => onSelectCandle(candleShapeDetails.index)}
          >
            {candleShapeDetails.error ? (
              <Icon name="warningOutline" color="red" size={30} />
            ) : (
              <Candle candleShapeDetails={candleShapeDetails} />
            )}
          </AccessibleTouchableOpacity>
        ))}
      </View>

      <Button
        style={{ padding: 5, margin: 5 }}
        disabled={numberOfCandles >= 3}
        onPress={addCandle}
      >
        <ButtonText>Add Candle</ButtonText>
      </Button>
      <Button
        style={{ padding: 5, margin: 5 }}
        disabled={numberOfCandles <= 1}
        onPress={removeCandle}
      >
        <ButtonText>Remove Candle</ButtonText>
      </Button>
    </>
  );
};
