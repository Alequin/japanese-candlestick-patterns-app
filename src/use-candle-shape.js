import { isFunction, isNull, mapValues, some, uniq } from "lodash";
import { useState } from "react";

export const useCandleShape = (numberOfCandles) => {
  const [activeCandleIndex, setActiveCandleIndex] = useState(0);
  const [candles, setCandles] = useState(
    new Array(numberOfCandles).fill(null).map(() => ({
      high: "1.0000",
      low: "1.0000",
      open: "1.0000",
      close: "1.0000",
    }))
  );

  const candlesShapes = candles
    .map((candle) => mapValues(candle, (value) => Number(value)))
    .map((candle) => {
      const validCandle = getValidCandle(candle);

      const isError = some(validCandle, isNull);

      // Default to be bullish in error situation
      const isBullish = !isError ? validCandle.close >= validCandle.open : true;

      return {
        error: isError ? invalidCandleReason(candle) : null,
        isBullish,
        ...candle,
        ...(!isError ? heights(isBullish, validCandle) : null),
      };
    });

  const setActiveCandleValueFor = (key) => (value) => {
    setCandles((previousCandles) => {
      const newValue = isFunction(value)
        ? value(previousCandles[activeCandleIndex][key])
        : value;
      previousCandles[activeCandleIndex][key] = newValue;
      console.log(
        "🚀 ~ file: use-candle-shape.js ~ line 35 ~ setCandles ~ previousCandles",
        previousCandles
      );
      return [...previousCandles]; // new array to allow the state to update
    });
  };

  return {
    error: candlesShapes.find(({ error }) => error)?.error,
    candlesShapes,
    activeCandle: {
      index: activeCandleIndex,
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
