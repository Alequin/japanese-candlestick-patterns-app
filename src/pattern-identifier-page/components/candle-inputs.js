import React, { useEffect, useMemo, useRef } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { AccessibleTouchableOpacity } from "../../components/accessible-touchable-opacity";
import { Icon } from "../../components/icon";

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
    <View testID="candleInputs" style={styles.container}>
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
  const inputRef = useRef();

  useEffect(() => {
    const keyboardEvent = Keyboard.addListener("keyboardDidHide", () =>
      inputRef.current.blur()
    );
    return () => keyboardEvent.remove();
  }, [inputRef]);

  return (
    <AccessibleTouchableOpacity
      style={styles.inputContainer}
      onPress={() => inputRef?.current?.focus()}
    >
      <View style={styles.inputWrapper}>
        <Text>{title}:</Text>
        <TextInput
          testID="candleValueInput"
          ref={inputRef}
          style={styles.input}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
          keyboardType="numeric"
        />
        <AccessibleTouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setValue("");
            inputRef?.current?.focus();
          }}
        >
          <Icon name="cross" color="black" size={22} />
        </AccessibleTouchableOpacity>
      </View>
    </AccessibleTouchableOpacity>
  );
};

const Warning = ({ error }) => {
  const style = useMemo(
    () => [
      styles.warningText,
      {
        opacity: error ? 1 : 0,
      },
    ],
    [error]
  );

  return (
    <View style={style}>
      <Icon name="warningOutline" color="red" size={30} />
      <Text> {`Invalid Candle: ${error}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
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
    justifyContent: "space-between",
  },
  input: {
    width: "45%",
    color: "black",
    textAlign: "center",
  },
  warningText: {
    alignItems: "center",
    flexDirection: "row",
  },
  clearButton: { paddingVertical: 5, alignItems: "center" },
});
