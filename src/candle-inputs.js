import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const CandleInputs = ({
  high,
  setHigh,
  low,
  setLow,
  open,
  setOpen,
  close,
  setClose,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={high}
        onChangeText={(value) => setHigh(value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={open}
        onChangeText={(value) => setOpen(value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={close}
        onChangeText={(value) => setClose(value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={low}
        onChangeText={(value) => setLow(value)}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 20,
    width: "100%",
  },
  input: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    textAlign: "center",
  },
});
