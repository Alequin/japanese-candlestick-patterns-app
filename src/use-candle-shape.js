import { isFunction, isNull, mapValues, some, uniq } from "lodash";
import { useState } from "react";
import { BEARISH, BULLISH } from "./candle-types";

export const useCandleShape = (numberOfCandles) => {
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const [candles, setCandles] = useState(
    new Array(numberOfCandles).fill(null).map(() => ({
      high: "2.0000",
      low: "1.0000",
      open: "1.2500",
      close: "1.7500",
    }))
  );

  const candlesShapes = candles
    .map((candle) => mapValues(candle, (value) => Number(value)))
    .map((candle) => {
      const validCandle = getValidCandle(candle);

      const isError = some(validCandle, isNull);

      // Default to be bullish in error situation
      const candleType = !isError ? getCandleType(validCandle) : BULLISH;

      return {
        error: isError ? invalidCandleReason(candle) : null,
        candleType,
        ...candle,
        ...(!isError ? heights(candleType, validCandle) : null),
      };
    });

  const setActiveCandleValueFor = (key) => (value) => {
    setCandles((previousCandles) => {
      const newValue = isFunction(value)
        ? value(previousCandles[activeCandleIndex][key])
        : value;
      previousCandles[activeCandleIndex][key] = newValue;

      return [...previousCandles]; // new array to allow the state to update
    });
  };

  return {
    error: candlesShapes.find(({ error }) => error)?.error,
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
  if (high < low) return "The 'high' is less than the 'low'";
  if (open > high) return "The 'open' is greater than the 'high'";
  if (open < low) return "The 'open' is less than the 'low'";
  if (close > high) return "The 'close' is greater than the 'high'";
  if (close < low) return "The 'close' is less than the 'low'";
  throw new Error("No matching invalid candle reason found");
};

const heights = (candleType, validCandleData) => {
  const areAllCandleValuesEqual =
    uniq(Object.values(validCandleData)).length === 1;

  if (areAllCandleValuesEqual) return neutralHeights();
  if (candleType === BULLISH) return bullishHeights(validCandleData);
  if (candleType === BEARISH) return bearishHeights(validCandleData);
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
  return Math.max(height || 1, 1);
};

const stickHeight = (high, bodyTop, fullHeight) => {
  const height = (Math.abs(high - bodyTop) / fullHeight) * 100;
  return height || 0;
};
