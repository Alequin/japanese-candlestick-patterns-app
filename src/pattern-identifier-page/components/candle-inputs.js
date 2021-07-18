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
        <View style={{ width: "16%" }} />
        <TextInput
          testID="candleValueInput"
          ref={inputRef}
          style={styles.input}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
          keyboardType="numeric"
        />
        <AccessibleTouchableOpacity
          style={{ width: "16%", paddingVertical: 5, alignItems: "center" }}
          onPress={() => setValue("")}
        >
          <Icon name="cross" color="black" size={22} />
        </AccessibleTouchableOpacity>
      </View>
      <View style={styles.inputTitle}>
        <Icon name="blankSpace" size={16} />
        <Text style={{ marginHorizontal: 5 }}>{title}</Text>
        <Icon name="edit" size={16} />
      </View>
    </AccessibleTouchableOpacity>
  );
};

const Warning = ({ error }) => {
  const style = useMemo(
    () => ({
      alignItems: "center",
      flexDirection: "row",
      opacity: error ? 1 : 0,
    }),
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
  },
  input: {
    width: "66%",
    color: "black",
    textAlign: "center",
  },
  inputTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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

  warningTitle: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  warningText: {
    textAlign: "center",
  },
});
