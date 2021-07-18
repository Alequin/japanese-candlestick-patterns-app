import React, { useEffect, useRef, useState } from "react";
import { PatternOverview } from "./pattern-overview";
import { PatternsList } from "./patterns-list";

export const AllPatternsPage = ({ route }) => {
  const [patternToView, setPatternToView] = useState(null);

  const listRef = useRef();
  const [patternListOffset, setPatternListOffset] = useState(0);

  useEffect(() => {
    if (!patternToView && patternListOffset !== 0) {
      listRef?.current?.scrollToOffset({
        offset: patternListOffset,
        animated: false,
      });
    }
  }, [patternToView]);

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
