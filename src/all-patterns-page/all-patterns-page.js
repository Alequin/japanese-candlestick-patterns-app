import React, { useState } from "react";
import { allPatterns } from "../patterns";
import { useOnPressBackButton } from "../use-on-press-back-button";
import { PatternOverview } from "./pattern-overview";
import { PatternsList } from "./patterns-list";

export const AllPatternsPage = ({ route }) => {
  const [patternToView, setPatternToView] = useState(null);

  return patternToView ? (
    <PatternOverview
      pattern={patternToView}
      onPressBack={() => setPatternToView(null)}
    />
  ) : (
    <PatternsList onSelectPattern={setPatternToView} />
  );
};
