import React from "react";
import { Text } from "react-native";

export const Title = ({ children }) => (
  <Text
    style={{
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 3,
      textAlign: "center",
    }}
  >
    {children}
  </Text>
);

export const TextSection = ({ children }) => (
  <Text
    style={{
      fontSize: 18,
      marginBottom: 10,
      marginLeft: 0,
      lineHeight: 27,
    }}
  >
    {children}
  </Text>
);

export const BulletPoint = ({ children }) => (
  <Text
    style={{
      width: "100%",
      fontSize: 18,
      marginBottom: 7,
      marginLeft: 10,
      lineHeight: 27,
    }}
  >
    {`\u2022 ${children}`}
  </Text>
);
