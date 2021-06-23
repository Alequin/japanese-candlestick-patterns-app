import { Entypo, Ionicons } from "@expo/vector-icons";
import camelCase from "lodash/camelCase";
import React from "react";
import { View } from "react-native";
import { dynamicFontSize } from "./dynamic-font-size";
import { textShadow } from "./text-shadow-style";

export const Icon = ({ icon, ...otherProps }) => {
  const IconToRender = ICON_OPTIONS[icon];
  if (!IconToRender)
    throw new Error(`Unable to find an icon by the name ${icon}`);
  return <IconToRender {...otherProps} />;
};

const customIcon =
  (IconSourceElement, iconName) =>
  ({ size, color, style, ...otherProps }) =>
    (
      <TestIdElement testID={`${camelCase(iconName)}Icon`} style={style}>
        <IconSourceElement
          name={iconName}
          size={dynamicFontSize(size)}
          color={color}
          style={textShadow}
          {...otherProps}
        />
      </TestIdElement>
    );

const ICON_OPTIONS = {
  plus: customIcon(Entypo, "plus"),
  minus: customIcon(Entypo, "minus"),
  warningOutline: customIcon(Ionicons, "warning-outline"),
  blankSpace: ({ size, ...otherProps }) => (
    <MaterialIcons
      name="check-box-outline-blank"
      size={size}
      color="transparent"
    >
      <TestIdElement testID="blankSpaceIcon" {...otherProps} />
    </MaterialIcons>
  ),
};

const TestIdElement = (props) => <View {...props} />;
