import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import camelCase from "lodash/camelCase";
import React from "react";
import { View } from "react-native";
import { dynamicFontSize } from "../dynamic-font-size";
import { textShadow } from "../text-shadow-style";

export const Icon = ({ name, ...otherProps }) => {
  const IconToRender = ICON_OPTIONS[name];
  if (!IconToRender)
    throw new Error(`Unable to find an icon by the name ${name}`);
  return <IconToRender {...otherProps} />;
};

const customIcon =
  (IconSourceElement, iconName, { testIdOverride } = {}) =>
  ({ size, color, style, ...otherProps }) =>
    (
      <TestIdElement
        testID={testIdOverride || `${camelCase(iconName)}Icon`}
        style={style}
      >
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
  cross: customIcon(Entypo, "cross"),
  edit: customIcon(Entypo, "edit"),
  book: customIcon(FontAwesome, "book"),
  underlineEdit: customIcon(Feather, "edit", {
    testIdOverride: "underlineEditIcon",
  }),
  arrowBack: customIcon(Ionicons, "arrow-back"),
  questionCircle: customIcon(FontAwesome, "question-circle"),
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

<Feather name="edit" size={24} color="black" />;

const TestIdElement = (props) => <View {...props} />;
