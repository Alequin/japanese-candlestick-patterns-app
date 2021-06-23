import { round } from "lodash";
import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "./icon";

export const CandleInputs = ({
  error,
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
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Input title="High" value={high} setValue={setHigh} />
        <Input title="Low" value={low} setValue={setLow} />
      </View>
      <View style={styles.inputRow}>
        <Input title="Open" value={open} setValue={setOpen} />
        <Input title="Close" value={close} setValue={setClose} />
      </View>
      <Warning error={error} />
    </View>
  );
};

const Input = ({ title, value, setValue }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value.toString()}
        onChangeText={(value) => setValue(value)}
        keyboardType="numeric"
      />
      <View style={styles.inputButtonsContainer}>
        <TouchableOpacity
          onPress={() => {
            const number = Number(value);
            return !isNaN(number)
              ? setValue(round(number - 0.00001, 5))
              : setValue(1);
          }}
        >
          <View style={styles.inputButton}>
            <Icon icon="minus" color="black" size={25} />
          </View>
        </TouchableOpacity>
        <Text>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            const number = Number(value);
            return !isNaN(number)
              ? setValue(round(number + 0.00001, 5))
              : setValue(1);
          }}
        >
          <View style={styles.inputButton}>
            <Icon icon="plus" color="black" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Warning = ({ error }) => {
  const style = useMemo(
    () => ({ ...styles.warningContainer, opacity: error ? 1 : 0 }),
    [error]
  );

  return (
    <View style={style}>
      <View style={styles.warningTitle}>
        <Icon
          style={styles.warningIcon}
          icon="warningOutline"
          color="red"
          size={30}
        />
        <Text>Invalid Candle</Text>
      </View>
      <Text style={styles.warningText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    paddingHorizontal: "5%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
    color: "black",
    textAlign: "center",
  },
  inputButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputButton: {
    padding: 2,
    borderRadius: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 8,
  },
  warningContainer: {
    alignItems: "center",
  },
  warningTitle: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  warningIcon: {
    marginRight: 5,
  },
  warningText: {
    textAlign: "center",
  },
});
