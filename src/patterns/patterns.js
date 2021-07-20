const { BEARISH, BULLISH } = require("../candle-types");
const { testPatterns } = require("./test-patterns");

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

const candleStickInformation = {
  name: "Candlesticks",
  doCandlesMatchPattern: () => false,
  exampleCandles: [
    {
      index: 0,
      error: null,
      candleType: "Bullish",
      rawCandle: { high: 99, low: 27, open: 81, close: 83 },
      high: 99,
      low: 27,
      open: 81,
      close: 83,
      bodyHeightPercentage: 2.7777777777777777,
      topSpaceHeightPercentage: 1,
      topStickHeightPercentage: 22.22222222222222,
      bottomStickHeightPercentage: 75,
      bottomSpaceHeightPercentage: 1,
      totalHeight: 100,
    },
  ],
};

const candlestickPatternInformation = {
  name: "Candlestick Patterns",
  doCandlesMatchPattern: () => false,
  exampleCandles: [
    {
      candleType: BULLISH,
      topSpaceHeightPercentage: 50,
      bodyHeightPercentage: 20,
      topStickHeightPercentage: 10,
      bottomStickHeightPercentage: 20,
      bottomSpaceHeightPercentage: 0,
    },
    {
      candleType: BULLISH,
      topSpaceHeightPercentage: 30,
      bodyHeightPercentage: 20,
      topStickHeightPercentage: 10,
      bottomStickHeightPercentage: 20,
      bottomSpaceHeightPercentage: 20,
    },
    {
      candleType: BULLISH,
      topSpaceHeightPercentage: 10,
      bodyHeightPercentage: 20,
      topStickHeightPercentage: 10,
      bottomStickHeightPercentage: 20,
      bottomSpaceHeightPercentage: 40,
    },
  ],
};

const singleCandlePatterns = [
  {
    name: "Spinning Top",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 10,
        largest: 40,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 25,
        largest: 60,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 25,
        largest: 60,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 40,
        bottomStickHeightPercentage: 40,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Standard Doji",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 10,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 15,
        largest: 75,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 15,
        largest: 75,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 47.5,
        bottomStickHeightPercentage: 47.5,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Gravestone Doji",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 10,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 75,
        largest: 100,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 95,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Dragon Fly Doji",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 10,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 75,
        largest: 100,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Four Price Doji",
    doCandlesMatchPattern: ([
      {
        high,
        low,
        open,
        close,
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const areAllPricesEqual = [high, low, open, close].every(
        (value) => Number(value) === Number(high)
      );

      return (
        areAllPricesEqual ||
        (bodyHeightPercentage <= 5 &&
          topStickHeightPercentage === 0 &&
          bottomStickHeightPercentage === 0)
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Hammer",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 10,
        largest: 34,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 70,
        largest: 95,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 2,
        bottomStickHeightPercentage: 78,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Inverted Hammer" /*Paper umbrella*/,
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 10,
        largest: 34,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 70,
        largest: 95,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 78,
        bottomStickHeightPercentage: 2,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Hanging Man" /*Paper umbrella*/,
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 10,
        largest: 34,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 70,
        largest: 95,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 2,
        bottomStickHeightPercentage: 78,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Shooting Star",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
      },
    ]) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 10,
        largest: 34,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 70,
        largest: 95,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 0,
        largest: 15,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 78,
        bottomStickHeightPercentage: 2,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bullish belt Hold",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
        candleType,
      },
    ]) => {
      if (candleType !== BULLISH) return false;

      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 75,
        largest: 95,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 10,
        largest: 25,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 0,
        largest: 5,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 80,
        topStickHeightPercentage: 20,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bearish belt Hold",
    doCandlesMatchPattern: ([
      {
        topStickHeightPercentage,
        bottomStickHeightPercentage,
        bodyHeightPercentage,
        candleType,
      },
    ]) => {
      if (candleType !== BEARISH) return false;

      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 75,
        largest: 80,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 5,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 10,
        largest: 25,
      });

      return (
        isBodyHightCorrect && isTopStickSizeCorrect && isBottomStickSizeCorrect
      );
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 80,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 20,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bullish Marubozu",
    doCandlesMatchPattern: ([{ bodyHeightPercentage, candleType }]) => {
      if (candleType !== BULLISH) return false;
      return bodyHeightPercentage >= 85;
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 100,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bearish Marubozu",
    doCandlesMatchPattern: ([{ bodyHeightPercentage, candleType }]) => {
      if (candleType !== BEARISH) return false;
      return bodyHeightPercentage >= 85;
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 0,
        bodyHeightPercentage: 100,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
];

const doubleCandlePatterns = [
  {
    name: "Bullish Engulfing",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BULLISH && // Main candle is bullish
        candles[0].candleType === BEARISH && // previous candle is bearish
        candles[1].totalHeight > candles[0].totalHeight && // Main candles total height is larger than the previous candles
        realCandleTopStickPercentage(candles[1]) < 0.2 && // Main candles top stick is not too large
        realCandleBodySizePercentage(candles[1]) >= 0.5 && // Main candle is large
        realCandleBodySizePercentage(candles[0]) >= 0.5 && // Previous candle is large
        realCandleSize(candles[0]) > realCandleSize(candles[1]) * 0.5 && // Previous candle is at least half the size of the main candle
        candles[1].close > candles[0].open && // Main candles close price is more than previous candles open price
        candles[1].open <= candles[0].close // Main candles open price is less than or equal to previous candles close price
      );
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 30,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 45,
        bottomStickHeightPercentage: 5,
        bottomSpaceHeightPercentage: 0,
      },
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 80,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bearish Engulfing",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BEARISH && // Main candle is bearish
        candles[0].candleType == BULLISH && // previous candle is bullish
        candles[1].totalHeight > candles[0].totalHeight && // Main candles total height is larger than the previous candles
        realCandleTopStickPercentage(candles[1]) < 0.2 && // Main candles top stick is not too large
        realCandleBodySizePercentage(candles[1]) >= 0.5 && // Main candle is large
        realCandleBodySizePercentage(candles[0]) >= 0.5 && // Previous candle is large
        realCandleSize(candles[0]) > realCandleSize(candles[1]) * 0.5 && // Previous candle is at least half the size of the main candle
        candles[1].close < candles[0].open && // Main candles close price is less than previous candles open price
        candles[1].open >= candles[0].close // Main candles open price is greater than or equal to previous candles close price
      );
    },
    exampleCandles: [
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 0,
        topStickHeightPercentage: 5,
        bodyHeightPercentage: 45,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 30,
      },
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 0,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 80,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bullish Piercing Line",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BULLISH && // Main candle is bullish
        candles[0].candleType == BEARISH && // previous candle is bearish
        candles[1].close > realCandleSize(candles[0]) / 2 && // Main candles close is above the midpoint of the previous candle
        candles[1].open <= candles[0].close && // Main candles open is less than or equal to the the previous candles close
        realCandleBodySizePercentage(candles[1]) >= 0.6 && // Main candles body height should be at least 60% of itself
        realCandleBodySizePercentage(candles[0]) >= 0.6 && // Previous candles body height should be at least 60% of itself
        candles[1].high <= candles[0].open // the Main candles high must be less than or equal to the previous candles open
      );
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        high: 69,
        low: 21,
        open: 66,
        close: 26,
        bodyHeightPercentage: 83,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 6,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 100,
      },
      {
        candleType: BULLISH,
        high: 60,
        low: 22,
        open: 26,
        close: 55,
        bodyHeightPercentage: 60,
        topSpaceHeightPercentage: 18,
        topStickHeightPercentage: 10,
        bottomStickHeightPercentage: 8,
        bottomSpaceHeightPercentage: 2,
        totalHeight: 79,
      },
    ],
  },
  {
    name: "Bearish Piercing Line",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BEARISH && // Main candle is bearish
        candles[0].candleType == BULLISH && // previous candle is bullish
        candles[1].close < realCandleSize(candles[0]) / 2 && // Main candles close is below the midpoint of the previous candle
        candles[1].open >= candles[0].close && // Main candles open is greater than or equal to the the previous candles close
        realCandleBodySizePercentage(candles[1]) >= 0.6 && // Main candles body height should be at least 60% of itself
        realCandleBodySizePercentage(candles[0]) >= 0.6 && // Previous candles body height should be at least 60% of itself
        candles[1].low >= candles[0].open // the Main candles low must be less than or equal to the previous candles open
      );
    },
    exampleCandles: [
      {
        index: 0,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 73, low: 1, open: 1, close: 67 },
        high: 73,
        low: 1,
        open: 1,
        close: 67,
        bodyHeightPercentage: 91.66666666666666,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 8.333333333333332,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 99.99999999999999,
      },
      {
        index: 1,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 70, low: 17, open: 67, close: 22 },
        high: 70,
        low: 17,
        open: 67,
        close: 22,
        bodyHeightPercentage: 62.5,
        topSpaceHeightPercentage: 4.166666666666666,
        topStickHeightPercentage: 4.166666666666666,
        bottomStickHeightPercentage: 6.944444444444445,
        bottomSpaceHeightPercentage: 22.22222222222222,
        totalHeight: 73.61111111111111,
      },
    ],
  },
  {
    name: "Tweezer Top",
    doCandlesMatchPattern: (candles) => {
      const candle1Size = realCandleSize(candles[0]);
      const candle2Size = realCandleSize(candles[1]);
      const largestCandle =
        candle2Size > candle1Size ? candle2Size : candle1Size;
      const highPriceRange = largestCandle * 0.1;

      return (
        candles[1].candleType === BEARISH && // Main candle is bearish
        candles[0].candleType == BULLISH && // previous candle is bullish
        realCandleBodySizePercentage(candles[0]) > 0.6 && // previous candles body is large
        candles[0].high < candles[1].high + highPriceRange &&
        candles[0].high > candles[1].high - highPriceRange
      );
    },
    exampleCandles: [
      {
        index: 0,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 100, low: 4, open: 16, close: 86 },
        high: 100,
        low: 4,
        open: 16,
        close: 86,
        bodyHeightPercentage: 72.91666666666666,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 14.583333333333334,
        bottomStickHeightPercentage: 12.5,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 99.99999999999999,
      },
      {
        index: 1,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 98, low: 38, open: 86, close: 52 },
        high: 98,
        low: 38,
        open: 86,
        close: 52,
        bodyHeightPercentage: 35.41666666666667,
        topSpaceHeightPercentage: 2.083333333333333,
        topStickHeightPercentage: 12.5,
        bottomStickHeightPercentage: 14.583333333333334,
        bottomSpaceHeightPercentage: 35.41666666666667,
        totalHeight: 62.50000000000001,
      },
    ],
  },
  {
    name: "Tweezer Bottom",
    doCandlesMatchPattern: (candles) => {
      const candle1Size = realCandleSize(candles[0]);
      const candle2Size = realCandleSize(candles[1]);
      const largestCandle =
        candle2Size > candle1Size ? candle2Size : candle1Size;
      const lowPriceRange = largestCandle * 0.1;

      return (
        candles[1].candleType === BULLISH && // Main candle is bullish
        candles[0].candleType == BEARISH && // previous candle is bearish
        realCandleBodySizePercentage(candles[0]) > 0.6 && // previous candles body is large
        candles[0].low < candles[1].low + lowPriceRange &&
        candles[0].low > candles[1].low - lowPriceRange
      );
    },
    exampleCandles: [
      {
        index: 0,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 96, low: 17, open: 88, close: 33 },
        high: 96,
        low: 17,
        open: 88,
        close: 33,
        bodyHeightPercentage: 67.90123456790124,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 9.876543209876543,
        bottomStickHeightPercentage: 19.753086419753085,
        bottomSpaceHeightPercentage: 2.4691358024691357,
        totalHeight: 97.53086419753087,
      },
      {
        index: 1,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 77, low: 15, open: 33, close: 68 },
        high: 77,
        low: 15,
        open: 33,
        close: 68,
        bodyHeightPercentage: 43.20987654320987,
        topSpaceHeightPercentage: 23.456790123456788,
        topStickHeightPercentage: 11.11111111111111,
        bottomStickHeightPercentage: 22.22222222222222,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 76.54320987654322,
      },
    ],
  },
];

const tripleCandlePatterns = [
  {
    name: "Three White Soldiers",
    doCandlesMatchPattern: (candles) => {
      return (
        candles.every(({ candleType }) => candleType === BULLISH) &&
        realCandleSize(candles[1]) >= realCandleSize(candles[0]) * 0.8 &&
        realCandleSize(candles[2]) >= realCandleSize(candles[1]) * 0.8 &&
        realCandleBodySizePercentage(candles[0]) > 0.5 &&
        realCandleBodySizePercentage(candles[1]) > 0.6 &&
        realCandleBodySizePercentage(candles[2]) > 0.65 &&
        candles[1].close > candles[0].close &&
        candles[2].close > candles[1].close
      );
    },
    exampleCandles: [
      {
        index: 0,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 36, low: 5, open: 5, close: 26 },
        high: 36,
        low: 5,
        open: 5,
        close: 26,
        bodyHeightPercentage: 23.595505617977526,
        topSpaceHeightPercentage: 65.1685393258427,
        topStickHeightPercentage: 11.235955056179774,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 34.8314606741573,
      },
      {
        index: 1,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 68, low: 21, open: 26, close: 58 },
        high: 68,
        low: 21,
        open: 26,
        close: 58,
        bodyHeightPercentage: 35.95505617977528,
        topSpaceHeightPercentage: 29.213483146067414,
        topStickHeightPercentage: 11.235955056179774,
        bottomStickHeightPercentage: 5.617977528089887,
        bottomSpaceHeightPercentage: 17.97752808988764,
        totalHeight: 52.80898876404495,
      },
      {
        index: 2,
        error: null,
        candleType: "Bullish",
        rawCandle: { high: 94, low: 50, open: 58, close: 93 },
        high: 94,
        low: 50,
        open: 58,
        close: 93,
        bodyHeightPercentage: 39.325842696629216,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 1.1235955056179776,
        bottomStickHeightPercentage: 8.98876404494382,
        bottomSpaceHeightPercentage: 50.56179775280899,
        totalHeight: 49.438202247191015,
      },
    ],
  },
  {
    name: "Three Black Crows",
    doCandlesMatchPattern: (candles) => {
      return (
        candles.every(({ candleType }) => candleType === BEARISH) &&
        realCandleSize(candles[1]) >= realCandleSize(candles[0]) * 0.8 &&
        realCandleSize(candles[2]) >= realCandleSize(candles[1]) * 0.8 &&
        realCandleBodySizePercentage(candles[0]) > 0.5 &&
        realCandleBodySizePercentage(candles[1]) > 0.6 &&
        realCandleBodySizePercentage(candles[2]) > 0.65 &&
        candles[1].close < candles[0].close &&
        candles[2].close < candles[1].close
      );
    },
    exampleCandles: [
      {
        index: 0,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 86, low: 63, open: 84, close: 66 },
        high: 86,
        low: 63,
        open: 84,
        close: 66,
        bodyHeightPercentage: 21.686746987951807,
        topSpaceHeightPercentage: 1,
        topStickHeightPercentage: 2.4096385542168677,
        bottomStickHeightPercentage: 3.614457831325301,
        bottomSpaceHeightPercentage: 72.28915662650603,
        totalHeight: 27.710843373493976,
      },
      {
        index: 1,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 71, low: 28, open: 66, close: 34 },
        high: 71,
        low: 28,
        open: 66,
        close: 34,
        bodyHeightPercentage: 38.55421686746988,
        topSpaceHeightPercentage: 18.072289156626507,
        topStickHeightPercentage: 6.024096385542169,
        bottomStickHeightPercentage: 7.228915662650602,
        bottomSpaceHeightPercentage: 30.120481927710845,
        totalHeight: 51.807228915662655,
      },
      {
        index: 2,
        error: null,
        candleType: "Bearish",
        rawCandle: { high: 39, low: 3, open: 34, close: 6 },
        high: 39,
        low: 3,
        open: 34,
        close: 6,
        bodyHeightPercentage: 33.734939759036145,
        topSpaceHeightPercentage: 56.62650602409639,
        topStickHeightPercentage: 6.024096385542169,
        bottomStickHeightPercentage: 3.614457831325301,
        bottomSpaceHeightPercentage: 1,
        totalHeight: 43.37349397590362,
      },
    ],
  },
];

const realCandleSize = (candle) => candle.high - candle.low;

const realCandleTopStickPercentage = (candle) => {
  const topBodyPrice = candle.close > candle.open ? candle.close : candle.open;
  return (candle.high - topBodyPrice) / realCandleSize(candle);
};

const realCandleBodySizePercentage = (candle) => {
  return Math.abs(candle.open - candle.close) / realCandleSize(candle);
};

module.exports.singleCandlePatterns = singleCandlePatterns;
module.exports.doubleCandlePatterns = doubleCandlePatterns;
module.exports.tripleCandlePatterns = tripleCandlePatterns;
module.exports.allPatterns = [
  candleStickInformation,
  candlestickPatternInformation,
  ...singleCandlePatterns,
  ...doubleCandlePatterns,
  ...tripleCandlePatterns,
];
// module.exports.allPatterns = testPatterns;
/*

Morning star
Evening star

*/
