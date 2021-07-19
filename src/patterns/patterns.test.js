import { uniqBy } from "lodash";
import { allPatterns } from "./patterns";

describe("Patterns", () => {
  it("Should have a unique name for every pattern", () => {
    const allPatternNames = uniqBy(allPatterns);
    expect(allPatternNames.length).toBe(allPatterns.length);
  });

  describe("Should have the same properties on every pattern object", () => {
    it.each(allPatterns.map(({ name }) => name))(
      "when the pattern name is %s",
      (patternName) => {
        const pattern = allPatterns.find(({ name }) => name === patternName);
        expect(pattern).toBeTruthy();
        expect(pattern).toHaveProperty("name");
        expect(pattern).toHaveProperty("doCandlesMatchPattern");
        expect(pattern).toHaveProperty("exampleCandles");
      }
    );
  });

  it("Matches all the expected Spinning top patterns", () => {
    testPattern({
      patternName: "Spinning Top",
      exampleCandles: require("./test-candles/spinning-top.json"),
    });
  });

  it("Matches all the expected Standard Doji patterns", () => {
    testPattern({
      patternName: "Standard Doji",
      exampleCandles: require("./test-candles/standard-doji.json"),
    });
  });

  it("Matches all the expected Gravestone Doji patterns", () => {
    testPattern({
      patternName: "Gravestone Doji",
      exampleCandles: require("./test-candles/gravestone-doji.json"),
    });
  });

  it("Matches all the expected Dragon Fly Doji patterns", () => {
    testPattern({
      patternName: "Dragon Fly Doji",
      exampleCandles: require("./test-candles/dragon-fly-doji.json"),
    });
  });

  it("Matches all the expected Four Price Doji patterns", () => {
    testPattern({
      patternName: "Four Price Doji",
      exampleCandles: require("./test-candles/four-price-doji.json"),
    });
  });

  it("Matches all the expected Hammer patterns", () => {
    testPattern({
      patternName: "Hammer",
      exampleCandles: require("./test-candles/hammer.json"),
    });
  });

  it("Matches all the expected Inverted Hammer patterns", () => {
    testPattern({
      patternName: "Inverted Hammer",
      exampleCandles: require("./test-candles/inverted-hammer.json"),
    });
  });

  it("Matches all the expected Hanging Man patterns", () => {
    testPattern({
      patternName: "Hanging Man",
      exampleCandles: require("./test-candles/hanging-man.json"),
    });
  });

  it("Matches all the expected Shooting Star patterns", () => {
    testPattern({
      patternName: "Shooting Star",
      exampleCandles: require("./test-candles/shooting-star.json"),
    });
  });

  it("Matches all the expected Bullish belt Hold patterns", () => {
    testPattern({
      patternName: "Bullish belt Hold",
      exampleCandles: require("./test-candles/bullish-belt-hold.json"),
    });
  });

  it("Matches all the expected Bearish belt Hold patterns", () => {
    testPattern({
      patternName: "Bearish belt Hold",
      exampleCandles: require("./test-candles/bearish-belt-hold.json"),
    });
  });

  it("Matches all the expected Bullish Marubozu patterns", () => {
    testPattern({
      patternName: "Bullish Marubozu",
      exampleCandles: require("./test-candles/bullish-marubozu.json"),
    });
  });

  it("Matches all the expected Bearish Marubozu patterns", () => {
    testPattern({
      patternName: "Bearish Marubozu",
      exampleCandles: require("./test-candles/bearish-marubozu.json"),
    });
  });

  it("Matches all the expected Bullish Engulfing patterns", () => {
    testPattern({
      patternName: "Bullish Engulfing",
      exampleCandles: require("./test-candles/bullish-engulfing.json"),
    });
  });

  it("Matches all the expected Bearish Engulfing patterns", () => {
    testPattern({
      patternName: "Bearish Engulfing",
      exampleCandles: require("./test-candles/bearish-engulfing.json"),
    });
  });
});

const testPattern = ({ patternName, exampleCandles }) => {
  const spinningTopPattern = allPatterns.find(
    ({ name }) => name === patternName
  );
  expect(spinningTopPattern).toBeTruthy();

  const allTestCandles = exampleCandles;
  for (const testCandles of allTestCandles) {
    expect(spinningTopPattern.doCandlesMatchPattern(testCandles)).toBe(true);
  }
};
