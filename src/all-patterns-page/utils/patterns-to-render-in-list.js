import { allPatterns } from "../../patterns";

export const patternsToRenderInList = (listColumns) => {
  if (listColumns === 1) return allPatterns;

  return [
    ...allPatterns,
    ...new Array(listColumns - (allPatterns.length % listColumns))
      .fill()
      .map((_, index) => ({ isBlankItem: true, blankIndex: index })),
  ];
};
