import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useOnPressBackButton = (callback, dependencyList) =>
  useEffect(() => {
    const backHandlerEvent = BackHandler.addEventListener(
      "hardwareBackPress",
      callback
    );
    return () => backHandlerEvent.remove();
  }, dependencyList);
