import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Candle } from "../../components/candle";
import { Button } from "../../shared-components/button";

export const PatternCard = ({ name, exampleCandles, onPress }) => {
  return (
    <Button style={styles.container} onPress={onPress}>
      <View style={styles.candlesView}>
        {exampleCandles.map((candleDetails, index) => (
          <View key={index} style={styles.candleWrapper}>
            <Candle candleShapeDetails={candleDetails} />
          </View>
        ))}
      </View>
      <Text>{name}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  candlesView: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  candleWrapper: {
    height: "100%",
    width: "25%",
    maxWidth: 30,
    margin: 2,
  },
});
