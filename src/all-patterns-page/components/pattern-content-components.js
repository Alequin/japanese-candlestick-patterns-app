import React from "react";
import { StyleSheet, Text } from "react-native";

export const Title = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

export const TextSection = ({ children }) => (
  <Text style={styles.textSection}>{children}</Text>
);

export const BulletPoint = ({ children }) => (
  <Text style={styles.bulletPoint}>{`\u2022 ${children}`}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "center",
  },
  textSection: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 0,
    lineHeight: 27,
  },
  bulletPoint: {
    fontSize: 18,
    marginBottom: 7,
    marginLeft: 10,
    lineHeight: 27,
  },
});
