import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
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
      <View testID="candleView" style={styles.candlesContainer}>
        {candlesShapes.map((candleShapeDetails, index) => (
          <SingleCandle
            key={`${index}-${candleShapeDetails.isActive}`} // Use isActive in key so it updates when state updates
            testID={`candleButton-${index}`}
            candleShapeDetails={candleShapeDetails}
            onSelectCandle={onSelectCandle}
          />
        ))}
      </View>

      <Button
        style={styles.changeCandleCountButton}
        disabled={numberOfCandles >= 3}
        onPress={addCandle}
      >
        <ButtonText>Add Candle</ButtonText>
      </Button>
      <Button
        style={styles.changeCandleCountButton}
        disabled={numberOfCandles <= 1}
        onPress={removeCandle}
      >
        <ButtonText>Remove Candle</ButtonText>
      </Button>
    </>
  );
};

const SingleCandle = ({ candleShapeDetails, testID, onSelectCandle }) => (
  <AccessibleTouchableOpacity
    testID={testID}
    style={useMemo(
      () => [
        styles.candleButton,
        { opacity: candleShapeDetails.isActive ? 1 : 0.5 },
      ],
      [candleShapeDetails.isActive]
    )}
    onPress={() => onSelectCandle(candleShapeDetails.index)}
  >
    {candleShapeDetails.error ? (
      <Icon name="warningOutline" color="red" size={27} />
    ) : (
      <Candle candleShapeDetails={candleShapeDetails} />
    )}
  </AccessibleTouchableOpacity>
);

const styles = StyleSheet.create({
  candlesContainer: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  candleButton: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  changeCandleCountButton: { padding: 5, margin: 5 },
});
