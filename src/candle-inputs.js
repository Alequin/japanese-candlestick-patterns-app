import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "./icon";

export const CandleInputs = ({
  activeCandle: {
    error,
    rawCandle: { high, low, open, close },
    setHigh,
    setLow,
    setOpen,
    setClose,
  },
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Input title="High" value={high} setValue={setHigh} />
        <Input title="Open" value={open} setValue={setOpen} />
      </View>
      <View style={styles.inputRow}>
        <Input title="Low" value={low} setValue={setLow} />
        <Input title="Close" value={close} setValue={setClose} />
      </View>
      <Warning error={error} />
    </View>
  );
};

const Input = ({ title, value, setValue }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Icon name="blankSpace" color="black" size={22} />
        <TextInput
          style={styles.input}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => setValue("")}>
          <Icon name="cross" color="black" size={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputButtonsContainer}>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

const HoldableOpacity = ({ onHold, ...props }) => {
  const [onHoldInterval, setOnHoldInterval] = useState(null);

  return (
    <TouchableOpacity
      {...props}
      onPressIn={async () => {
        onHold(0.00001);
        let loopCount = 0;
        setOnHoldInterval(
          setInterval(async () => {
            loopCount++;
            if (loopCount > 30) return onHold(0.01155);
            if (loopCount > 20) return onHold(0.00115);
            if (loopCount > 10) return onHold(0.00011);
            onHold(0.00001);
          }, 100)
        );
      }}
      onPressOut={() => {
        clearInterval(onHoldInterval);
        setOnHoldInterval(null);
      }}
    />
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
          name="warningOutline"
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  input: {
    flex: 1,
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
    elevation: 2,
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
