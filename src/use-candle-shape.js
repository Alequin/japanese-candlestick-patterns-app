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
import { findCandleShapeDetails } from "./find-candle-shape-details";

const DEFAULT_CANDLES = new Array(3).fill(null).map(() => ({
  high: "2.0000",
  low: "1.0000",
  open: "1.2500",
  close: "1.7500",
}));

export const useCandleShape = (numberOfCandles) => {
  const [rawCandles, setRawCandles] = useState(DEFAULT_CANDLES);

  const setActiveCandleValueFor = (key, index) => (value) => {
    setRawCandles((previousCandles) => {
      const newCandles = cloneDeep(previousCandles);

      newCandles[index][key] = isFunction(value)
        ? value(newCandles[index][key])
        : value;

      return newCandles;
    });
  };

  return findCandleShapeDetails(rawCandles, numberOfCandles).map(
    (candleDetails, index) => ({
      ...candleDetails,
      setHigh: setActiveCandleValueFor("high", index),
      setLow: setActiveCandleValueFor("low", index),
      setOpen: setActiveCandleValueFor("open", index),
      setClose: setActiveCandleValueFor("close", index),
    })
  );
};
