import React, { useState } from "react";
import { useOnPressBackButton } from "../use-on-press-back-button";
import { PatternOverview } from "./pattern-overview";
import { PatternsList } from "./patterns-list";

export const AllPatternsPage = ({ route }) => {
  const [patternToView, setPatternToView] = useState(null);

  useOnPressBackButton(() => {
    if (!patternToView) return false;
    setPatternToView(null);
    return true;
  }, [!!patternToView]);

  return patternToView ? (
    <PatternOverview pattern={patternToView} />
  ) : (
    <PatternsList onSelectPattern={setPatternToView} />
  );
};
