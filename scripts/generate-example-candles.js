const { random, kebabCase, isNumber, sum } = require("lodash");
const fs = require("fs");
const { BEARISH, BULLISH } = require("../src/candle-types");
const {
  allPatterns,
  singleCandlePatterns,
  doubleCandlePatterns,
} = require("../src/patterns/patterns");

const TOTAL_EXAMPLES = 100;
const INCLUDE_SPACE = true;

const run = (targetPattern, candleCount) => {
  const pattern = allPatterns.find(({ name }) => name === targetPattern);

  const examples = [];
  while (examples.length < TOTAL_EXAMPLES) {
    const candlesToTest = new Array(candleCount).fill(null).map(newCandle);

    const candleSizes = candlesToTest.map((candle) =>
      sum(Object.values(candle))
    );

    if (candleSizes.some((candleSize) => candleSize > 100)) continue;

    const candlesWithAdditionalDetails = candlesToTest.map((candle) => ({
      ...candle,
      candleType: random(1, 2) === 1 ? BULLISH : BEARISH,
      totalHeight: random(0, 100),
      close: random(0, 100),
      open: random(0, 100),
    }));

    if (pattern.doCandlesMatchPattern(candlesWithAdditionalDetails)) {
      examples.push(candlesWithAdditionalDetails);
    }
  }

  fs.writeFileSync(
    `${kebabCase(pattern.name)}.json`,
    JSON.stringify(examples),
    null,
    2
  );
};

const newCandle = () => {
  let total = 0;
  const bodyHeightPercentage = random(0, 100);
  total += bodyHeightPercentage;
  const topStickHeightPercentage = random(0, 100 - total);
  total += topStickHeightPercentage;
  const bottomStickHeightPercentage = random(0, 100 - total);
  total += bottomStickHeightPercentage;
  const topSpaceHeightPercentage = INCLUDE_SPACE ? random(0, 100 - total) : 0;
  total += topSpaceHeightPercentage;
  const bottomSpaceHeightPercentage = INCLUDE_SPACE
    ? random(0, 100 - total)
    : 0;

  return {
    bodyHeightPercentage,
    topStickHeightPercentage,
    bottomStickHeightPercentage,
    topSpaceHeightPercentage,
    bottomSpaceHeightPercentage,
  };
};

doubleCandlePatterns.forEach(({ name }) => run(name, 2));
