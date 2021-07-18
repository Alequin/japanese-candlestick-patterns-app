import React from "react";
import { Text } from "react-native";
import { useMemo } from "react/cjs/react.development";
import { AccessibleTouchableOpacity } from "../accessible-touchable-opacity";

export const Button = ({ children, style = {}, ...buttonProps }) => {
  return (
    <AccessibleTouchableOpacity
      accessibilityRole="button"
      style={useButtonStyle(style)}
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

const useButtonStyle = (additionalStyles) =>
  useMemo(
    () => ({
      borderRadius: 20,
      borderColor: "gray",
      borderWidth: 1,
      backgroundColor: "white",
      elevation: 2,
      ...additionalStyles,
    }),
    [additionalStyles]
  );
