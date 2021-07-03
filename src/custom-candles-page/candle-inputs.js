import React, { useEffect, useMemo, useRef } from "react";
import {
  Keyboard,
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
  const inputRef = useRef();

  useEffect(() => {
    const keyboardEvent = Keyboard.addListener("keyboardDidHide", () =>
      inputRef.current.blur()
    );
    return () => keyboardEvent.remove();
  }, [inputRef]);

  return (
    <TouchableOpacity
      style={styles.inputContainer}
      onPress={() => inputRef?.current?.focus()}
    >
      <View style={styles.inputWrapper}>
        <Icon style={{ flex: 2 }} name="blankSpace" size={22} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={{ flex: 2, paddingVertical: 5, alignItems: "center" }}
          onPress={() => setValue("")}
        >
          <Icon name="cross" color="black" size={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputTitle}>
        <Icon name="blankSpace" size={16} />
        <Text style={{ marginHorizontal: 5 }}>{title}</Text>
        <Icon name="edit" size={16} />
      </View>
    </TouchableOpacity>
  );
};

const Warning = ({ error }) => {
  const style = useMemo(
    () => ({ ...styles.warningContainer, opacity: error ? 1 : 0 }),
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
    flex: 8,
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
  warningContainer: {
    alignItems: "center",
    flexDirection: "row",
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
