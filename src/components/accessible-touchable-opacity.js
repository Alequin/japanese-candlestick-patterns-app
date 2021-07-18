import React from "react";
import { TouchableOpacity } from "react-native";

export const AccessibleTouchableOpacity = (props) => (
  <TouchableOpacity accessibilityRole="button" {...props} />
);
