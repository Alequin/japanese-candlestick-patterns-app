import { assign } from "lodash";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMemo } from "react/cjs/react.development";

export const Button = ({ children, style = {}, ...buttonProps }) => {
  return (
    <TouchableOpacity style={useButtonStyle(style)} {...buttonProps}>
      {children}
    </TouchableOpacity>
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
