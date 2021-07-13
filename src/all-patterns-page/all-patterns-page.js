import React, { useState } from "react";
import { allPatterns } from "../patterns";
import { PatternOverview } from "./pattern-overview";
import { PatternsList } from "./patterns-list";

export const AllPatternsPage = ({ route }) => {
  const [patternToView, setPatternToView] = useState(allPatterns[0]);

  return patternToView ? (
    <PatternOverview pattern={patternToView} />
  ) : (
    <PatternsList onSelectPattern={setPatternToView} />
  );
};
