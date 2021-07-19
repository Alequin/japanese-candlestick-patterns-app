import { useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { allPatterns } from "../patterns/patterns";
import { PatternOverview } from "./pattern-overview";
import { PatternsList } from "./patterns-list";

export const AllPatternsPage = () => {
  const { patternToView, setPatternToView } = usePatternToView();

  const listRef = useRef();
  const setPatternListOffset = useSetListOffsetToLastKnownValue(
    listRef,
    useCallback(() => !patternToView, [patternToView])
  );

  return patternToView ? (
    <PatternOverview
      pattern={patternToView}
      onPressBack={() => setPatternToView(null)}
    />
  ) : (
    <PatternsList
      onSelectPattern={setPatternToView}
      listRef={listRef}
      onScroll={(event) =>
        setPatternListOffset(event.nativeEvent.contentOffset.y)
      }
    />
  );
};

const usePatternToView = () => {
  const patternName = useRoute()?.params?.patternName;
  const navigation = useNavigation();

  return {
    patternToView: useMemo(() => findPatternByName(patternName), [patternName]),
    setPatternToView: useCallback(
      (newPatternName) =>
        navigation.setParams({
          patternName: newPatternName,
        }),
      [navigation]
    ),
  };
};

const findPatternByName = (patternName) =>
  allPatterns.find(({ name }) => name === patternName);

const useSetListOffsetToLastKnownValue = (
  listRef,
  shouldSetToLastKnownOffset
) => {
  const [patternListOffset, setPatternListOffset] = useState(0);

  useEffect(() => {
    if (shouldSetToLastKnownOffset() && patternListOffset !== 0) {
      listRef?.current?.scrollToOffset({
        offset: patternListOffset,
        animated: false,
      });
    }
  }, [shouldSetToLastKnownOffset]);

  return setPatternListOffset;
};
