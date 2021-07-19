import { Dimensions } from "react-native";

export const columnCount = () => {
  const windowWidth = Dimensions.get("window").width;
  if (windowWidth < 350) return 1;
  if (windowWidth < 600) return 2;
  return 3;
};
