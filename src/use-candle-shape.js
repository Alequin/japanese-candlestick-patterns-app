import {
  cloneDeep,
  isFunction,
  isNull,
  isNumber,
  mapValues,
  maxBy,
  minBy,
  some,
  uniq,
} from "lodash";
import { useState } from "react";
import { BEARISH, BULLISH } from "./candle-types";

const DEFAULT_CANDLES = new Array(3).fill(null).map(() => ({
  high: "2.0000",
  low: "1.0000",
  open: "1.2500",
  close: "1.7500",
}));

export const useCandleShape = (numberOfCandles) => {
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const [candles, setCandles] = useState(DEFAULT_CANDLES);
  const validCandles = candles
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

  const candlesShapes = validCandles.map(
    ({ candle, validCandle, isError }, index) => {
      // Default to be bullish in error situation
      const candleType = !isError ? getCandleType(validCandle) : BULLISH;

      return {
        error: isError ? invalidCandleReason(candle) : null,
        isActive: index === activeCandleIndex,
        candleType,
        setAsActiveCandle: () => setActiveCandleIndex(index),
        ...candle,
        ...(!isError
          ? heights(candleType, validCandle, minPrice, maxPrice)
          : null),
      };
    }
  );

  const setActiveCandleValueFor = (key) => (value) => {
    setCandles((previousCandles) => {
      const newCandles = cloneDeep(previousCandles);

      newCandles[activeCandleIndex][key] = isFunction(value)
        ? value(newCandles[activeCandleIndex][key])
        : value;

      return newCandles;
    });
  };

  return {
    error: candlesShapes[activeCandleIndex].error,
    candlesShapes,
    activeCandle: {
      index: activeCandleIndex,
      ...candlesShapes[activeCandleIndex],
      ...candles[activeCandleIndex],
      setHigh: setActiveCandleValueFor("high"),
      setLow: setActiveCandleValueFor("low"),
      setOpen: setActiveCandleValueFor("open"),
      setClose: setActiveCandleValueFor("close"),
    },
  };
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
  if (!high) return "Missing price for 'high'";
  if (!low) return "Missing price for 'low'";
  if (!open) return "Missing price for 'open'";
  if (!close) return "Missing price for 'close'";
  if (high < low) return "The 'high' is less than the 'low'";
  if (open > high) return "The 'open' is greater than the 'high'";
  if (open < low) return "The 'open' is less than the 'low'";
  if (close > high) return "The 'close' is greater than the 'high'";
  if (close < low) return "The 'close' is less than the 'low'";
  throw new Error("No matching invalid candle reason found");
};

const heights = (candleType, validCandleData, minPrice, maxPrice) => {
  const areAllCandleValuesEqual =
    uniq(Object.values(validCandleData)).length === 1;

  if (areAllCandleValuesEqual) return neutralHeights();
  if (candleType === BULLISH)
    return bullishHeights(validCandleData, minPrice, maxPrice);
  if (candleType === BEARISH)
    return bearishHeights(validCandleData, minPrice, maxPrice);
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

const validHigh = ({ high, low, open, close }) => {
  const isValid =
    isNumber(low) && [low, open, close].every((value) => value <= high);
  return isValid ? high : null;
};
const validLow = ({ high, low, open, close }) => {
  console.log(
    "🚀 ~ file: use-candle-shape.js ~ line 172 ~ validLow ~ low",
    low
  );
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
