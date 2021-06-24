import { isNull, some, uniq } from "lodash";
import { useMemo } from "react";

export const useCandleShape = (candleData) =>
  useMemo(() => {
    const validCandleData = getValidCandleData(candleData);

    if (some(validCandleData, isNull))
      return { error: invalidCandleReason(candleData), isBullish: true };

    const isBullish = validCandleData.close >= validCandleData.open;

    return {
      isCandleValid: true,
      isBullish,
      ...heights(isBullish, validCandleData),
    };
  }, Object.values(candleData));

const getValidCandleData = (candleData) => {
  const validCandleData = {
    ...candleData,
    high: validHigh(candleData),
    low: validLow(candleData),
  };
  validCandleData.open = validOpen(validCandleData);
  validCandleData.close = validClose(validCandleData);

  return validCandleData;
};

const invalidCandleReason = ({ high, low, open, close }) => {
  if (high < low) return "The 'high' is less than the 'low'";
  if (open > high) return "The 'open' is greater than the 'high'";
  if (open < low) return "The 'open' is less than the 'low'";
  if (close > high) return "The 'close' is greater than the 'high'";
  if (close < low) return "The 'close' is less than the 'low'";
  throw new Error("No matching invalid candle reason found");
};

const heights = (isBullish, validCandleData) => {
  if (uniq(Object.values(validCandleData)).length === 1)
    return neutralHeights();

  return isBullish
    ? bullishHeights(validCandleData)
    : bearishHeights(validCandleData);
};

const neutralHeights = () => ({
  bodyHeightPercentage: 1,
  topStickHeightPercentage: 0,
  bottomStickHeightPercentage: 0,
});
const bullishHeights = ({ high, low, open, close }) => {
  const fullHeight = high - low;
  return {
    bodyHeightPercentage: bodyHeight(open, close, fullHeight),
    topStickHeightPercentage: stickHeight(high, close, fullHeight),
    bottomStickHeightPercentage: stickHeight(low, open, fullHeight),
  };
};

const bearishHeights = ({ high, low, open, close }) => {
  const fullHeight = high - low;

  return {
    bodyHeightPercentage: bodyHeight(open, close, fullHeight),
    topStickHeightPercentage: stickHeight(high, open, fullHeight),
    bottomStickHeightPercentage: stickHeight(low, close, fullHeight),
  };
};

const validHigh = ({ high, low, open, close }) => {
  const isValid = [low, open, close].every((value) => value <= high);
  return isValid ? high : null;
};
const validLow = ({ high, low, open, close }) => {
  const isValid = [high, open, close].every((value) => value >= low);
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
  return height || 0;
};

const stickHeight = (high, bodyTop, fullHeight) => {
  const height = (Math.abs(high - bodyTop) / fullHeight) * 100;
  return height || 0;
};
