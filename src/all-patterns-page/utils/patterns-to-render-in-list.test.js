jest.mock("../../patterns/patterns", () => ({
  allPatterns: [1, 2, 3, 4, 5],
}));

import { allPatterns } from "../../patterns/patterns";
import { patternsToRenderInList } from "./patterns-to-render-in-list";

describe("patterns to render in list", () => {
  it("Returns all patterns without any extra elements when the column count is 1", () => {
    expect(patternsToRenderInList(1)).toEqual(allPatterns);
  });

  it("Returns all patterns with one extra element when there are 5 pattens and 2 columns", () => {
    expect(patternsToRenderInList(2)).toEqual([
      ...allPatterns,
      { isBlankItem: true, blankIndex: 0 },
    ]);
  });

  it("Returns all patterns with one extra element when there are 5 pattens and 3 columns", () => {
    expect(patternsToRenderInList(3)).toEqual([
      ...allPatterns,
      { isBlankItem: true, blankIndex: 0 },
    ]);
  });

  it("Returns all patterns with three extra element when there are 5 pattens and 4 columns", () => {
    expect(patternsToRenderInList(4)).toEqual([
      ...allPatterns,
      { isBlankItem: true, blankIndex: 0 },
      { isBlankItem: true, blankIndex: 1 },
      { isBlankItem: true, blankIndex: 2 },
    ]);
  });
});
