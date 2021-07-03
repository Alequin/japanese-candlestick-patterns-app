import constants from "expo-constants";
import React from "react";
import { StyleSheet, View } from "react-native";

export const StatusBarPlaceholder = () => (
  <View style={styles.statusBarPlaceholder} />
);

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    height: constants.statusBarHeight + 10,
  },
});
