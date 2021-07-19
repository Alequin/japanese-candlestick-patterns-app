import { Dimensions } from "react-native";
import { windowWidth } from "../../dimensions";

export const columnCount = () => {
  const width = windowWidth();
  if (width < 350) return 1;
  if (width < 600) return 2;
  return 3;
};
