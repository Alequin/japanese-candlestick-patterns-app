import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMemo } from "react/cjs/react.development";

export const Button = ({ children, style = {}, ...buttonProps }) => {
  const buttonStyle = useMemo(() => ({ ...styles.button, ...style }));

  return (
    <TouchableOpacity style={buttonStyle} {...buttonProps}>
      {children}
    </TouchableOpacity>
  );
};

export const ButtonText = (props) => (
  <Text style={styles.buttonText} {...props} />
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 2,
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
  },
});
