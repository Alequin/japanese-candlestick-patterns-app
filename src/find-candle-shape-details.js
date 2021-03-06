const {
  cloneDeep,
  isFunction,
  isNull,
  isNumber,
  mapValues,
  maxBy,
  minBy,
  some,
  uniq,
} = require("lodash");
const { BEARISH, BULLISH } = require("./candle-types");

module.exports.findCandleShapeDetails = (rawCandles, numberOfCandles) => {
  const validCandles = rawCandles
    .slice(0, numberOfCandles)
    .map((candle) =>
      mapValues(candle, (value) => {
        const isEmptyString = value !== ""; // Check is empty string as when converted to a number "" becomes 0
        return isEmptyString ? Number(value) : null;
      })
    )
    .map((candle) => {
      const validCandle = getValidCandle(candle);
      return {
        candle,
        validCandle,
        isError: some(validCandle, isNull),
      };
    });

  const maxPrice = maxBy(validCandles, ({ validCandle, isError }) => {
    if (isError) return Number.MIN_SAFE_INTEGER;
    return validCandle.high;
  }).validCandle.high;

  const minPrice = minBy(validCandles, ({ validCandle, isError }) => {
    if (isError) return Number.MAX_SAFE_INTEGER;
    return validCandle.low;
  }).validCandle.low;

  return validCandles.map(({ candle, validCandle, isError }, index) => {
    const rawCandle = rawCandles[index];
    // Default to be bullish in error situation
    const candleType = !isError ? getCandleType(validCandle) : BULLISH;

    return {
      index,
      error: isError ? invalidCandleReason(candle) : null,
      candleType,
      rawCandle,
      ...validCandle,
      ...(!isError
        ? heights(candleType, validCandle, minPrice, maxPrice)
        : null),
    };
  });
};

const getValidCandle = (candleData) => {
  const validCandleData = {
    ...candleData,
    high: validHigh(candleData),
    low: validLow(candleData),
  };
  validCandleData.open = validOpen(validCandleData);
  validCandleData.close = validClose(validCandleData);

  return validCandleData;
};

const getCandleType = ({ open, close }) => (close >= open ? BULLISH : BEARISH);

const invalidCandleReason = ({ high, low, open, close }) => {
  if (!high) return "Missing high price";
  if (!low) return "Missing low price";
  if (!open) return "Missing open price";
  if (!close) return "Missing close price";
  if (high < low) return "The high is less than the low";
  if (open > high) return "The open is greater than the high";
  if (open < low) return "The open is less than the low";
  if (close > high) return "The close is greater than the high";
  if (close < low) return "The close is less than the low";
  throw new Error("No matching invalid candle reason found");
};

const heights = (candleType, validCandleData, minPrice, maxPrice) => {
  const areAllCandleValuesEqual =
    uniq(Object.values(validCandleData)).length === 1;

  if (areAllCandleValuesEqual) return neutralHeights();
  if (candleType === BULLISH)
    return withTotalCandleHeight(
      bullishHeights(validCandleData, minPrice, maxPrice)
    );
  if (candleType === BEARISH)
    return withTotalCandleHeight(
      bearishHeights(validCandleData, minPrice, maxPrice)
    );
};

const neutralHeights = () => ({
  bodyHeightPercentage: 1,
  topStickHeightPercentage: 0,
  bottomStickHeightPercentage: 0,
});

const bullishHeights = ({ high, low, open, close }, minPrice, maxPrice) => {
  const fullHeight = maxPrice - minPrice;

  return {
    bodyHeightPercentage: bodyHeight(open, close, fullHeight),
    topSpaceHeightPercentage: spaceHeight(maxPrice, high, fullHeight),
    topStickHeightPercentage: stickHeight(high, close, fullHeight),
    bottomStickHeightPercentage: stickHeight(low, open, fullHeight),
    bottomSpaceHeightPercentage: spaceHeight(minPrice, low, fullHeight),
  };
};

const bearishHeights = ({ high, low, open, close }, minPrice, maxPrice) => {
  const fullHeight = maxPrice - minPrice;

  return {
    bodyHeightPercentage: bodyHeight(open, close, fullHeight),
    topSpaceHeightPercentage: spaceHeight(maxPrice, high, fullHeight),
    topStickHeightPercentage: stickHeight(high, open, fullHeight),
    bottomStickHeightPercentage: stickHeight(low, close, fullHeight),
    bottomSpaceHeightPercentage: spaceHeight(minPrice, low, fullHeight),
  };
};

const withTotalCandleHeight = (candleHeights) => ({
  ...candleHeights,
  totalHeight:
    candleHeights.topStickHeightPercentage +
    candleHeights.bodyHeightPercentage +
    candleHeights.bottomStickHeightPercentage,
});

const validHigh = ({ high, low, open, close }) => {
  const isValid =
    isNumber(low) && [low, open, close].every((value) => value <= high);
  return isValid ? high : null;
};
const validLow = ({ high, low, open, close }) => {
  const isValid =
    isNumber(low) && [high, open, close].every((value) => value >= low);
  return isValid ? low : null;
};
const validOpen = ({ high, low, open }) => {
  return isCandleBodyPriceValid(high, low, open) ? open : null;
};
const validClose = ({ high, low, close }) => {
  return isCandleBodyPriceValid(high, low, close) ? close : null;
};
const isCandleBodyPriceValid = (high, low, bodyPrice) => {
  return high >= bodyPrice && low <= bodyPrice;
};

const bodyHeight = (close, open, fullHeight) => {
  const height = (Math.abs(close - open) / fullHeight) * 100;
  return Math.max(height || 1, 1);
};

const spaceHeight = (maxPrice, high, fullHeight) => {
  const height = (Math.abs(maxPrice - high) / fullHeight) * 100;
  return Math.max(height || 1, 1);
};

const stickHeight = (high, bodyTop, fullHeight) => {
  const height = (Math.abs(high - bodyTop) / fullHeight) * 100;
  return height || 0;
};
