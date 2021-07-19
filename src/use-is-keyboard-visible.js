import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useIsKeyboardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowEvent = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const keyboardHideEvent = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    // cleanup function
    return () => {
      keyboardShowEvent.remove();
      keyboardHideEvent.remove();
    };
  }, []);

  return isKeyboardVisible;
};
