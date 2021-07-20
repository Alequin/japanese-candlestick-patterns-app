const { random, kebabCase, isNumber, sum } = require("lodash");
const fs = require("fs");
const { BEARISH, BULLISH } = require("../src/candle-types");
const {
  allPatterns,
  singleCandlePatterns,
  doubleCandlePatterns,
} = require("../src/patterns/patterns");
const { findCandleShapeDetails } = require("../src/find-candle-shape-details");

const TOTAL_EXAMPLES = 100;
const INCLUDE_SPACE = true;

const run = (targetPattern, candleCount) => {
  const pattern = allPatterns.find(({ name }) => name === targetPattern);

  const examples = [];
  while (examples.length < TOTAL_EXAMPLES) {
    const candlesToTest = findCandleShapeDetails(
      newCandles(candleCount),
      candleCount
    );

    if (candlesToTest.some(({ error }) => !!error)) continue;

    if (pattern.doCandlesMatchPattern(candlesToTest))
      examples.push(candlesToTest);
  }

  fs.writeFileSync(
    `${kebabCase(pattern.name)}.json`,
    JSON.stringify(examples),
    null,
    2
  );
};

const newCandles = (candleCount) => {
  const candles = [];
  for (const index in new Array(candleCount).fill(null)) {
    const previousCandle = candles[Number(index) - 1];
    candles.push(newCandle(previousCandle?.close));
  }
  return candles;
};

const newCandle = (previousClose) => {
  const open = previousClose ? previousClose : random(0, 100);
  const high = random(open, 100);
  const low = random(0, open);
  const close = random(low, high);

  return {
    high,
    low,
    open,
    close,
  };
};

const namesBlockList = ["Four Price Doji"];

singleCandlePatterns
  .filter(({ name }) => !namesBlockList.includes(name))
  .forEach(({ name }) => run(name, 1));

doubleCandlePatterns
  .filter(({ name }) => !namesBlockList.includes(name))
  .forEach(({ name }) => run(name, 2));
