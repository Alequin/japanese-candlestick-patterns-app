import React from "react";
import { Text } from "react-native";
import { useMemo } from "react/cjs/react.development";
import { AccessibleTouchableOpacity } from "../components/accessible-touchable-opacity";

export const Button = ({ children, style = {}, disabled, ...buttonProps }) => {
  return (
    <AccessibleTouchableOpacity
      accessibilityRole="button"
      style={useButtonStyle(style, disabled)}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </AccessibleTouchableOpacity>
  );
};

export const ButtonText = (props) => (
  <Text
    style={{
      width: "100%",
      textAlign: "center",
    }}
    {...props}
  />
);

const useButtonStyle = (additionalStyles, disabled) =>
  useMemo(
    () => ({
      opacity: disabled ? 0.5 : 1,
      borderRadius: 20,
      borderColor: "gray",
      borderWidth: 1,
      backgroundColor: "white",
      elevation: 2,
      ...additionalStyles,
    }),
    [additionalStyles]
  );
