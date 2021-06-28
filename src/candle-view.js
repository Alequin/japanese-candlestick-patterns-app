import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Candle } from "./candle";

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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {candlesShapes.map((candleShapeDetails, index) => (
          <Candle
            key={`${index}-${candleShapeDetails.isActive}`} // Use is active in key so it updates when state updates
            candleShapeDetails={candleShapeDetails}
            onSelectCandle={onSelectCandle}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={addCandle}>
        <Text style={styles.buttonText}>Add Candle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={removeCandle}>
        <Text style={styles.buttonText}>Remove Candle</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 2,
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
  },
});
