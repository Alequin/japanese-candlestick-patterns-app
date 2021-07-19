import React from "react";
import { StyleSheet, Text } from "react-native";
import { useMemo } from "react/cjs/react.development";
import { AccessibleTouchableOpacity } from "../components/accessible-touchable-opacity";

export const Button = ({ children, style = {}, disabled, ...buttonProps }) => (
  <AccessibleTouchableOpacity
    accessibilityRole="button"
    style={useButtonStyle(style, disabled)}
    disabled={disabled}
    {...buttonProps}
  >
    {children}
  </AccessibleTouchableOpacity>
);

export const ButtonText = (props) => <Text style={styles.text} {...props} />;

const useButtonStyle = (additionalStyles, disabled) =>
  useMemo(
    () => [styles.button, additionalStyles, { opacity: disabled ? 0.5 : 1 }],
    [additionalStyles, disabled]
  );

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 2,
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
});
