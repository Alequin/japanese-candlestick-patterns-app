import constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { background } from "./colours";

export const StatusBarPlaceholder = () => (
  <View style={styles.statusBarPlaceholder} />
);

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    height: constants.statusBarHeight + 10,
    backgroundColor: background,
  },
});
