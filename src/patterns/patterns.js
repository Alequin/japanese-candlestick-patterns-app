const { BEARISH, BULLISH } = require("../candle-types");

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

const candleStickInformation = {
  name: "Candlesticks",
  doCandlesMatchPattern: () => false,
  exampleCandles: [
    {
      candleType: BEARISH,
      topSpaceHeightPercentage: 0,
      bodyHeightPercentage: 60,
      topStickHeightPercentage: 20,
      bottomStickHeightPercentage: 20,
      bottomSpaceHeightPercentage: 0,
    },
    {
      candleType: BULLISH,
      topSpaceHeightPercentage: 0,
      bodyHeightPercentage: 60,
      topStickHeightPercentage: 20,
      bottomStickHeightPercentage: 20,
      bottomSpaceHeightPercentage: 0,
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
        largest: 34,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 30,
        largest: 60,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 30,
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
        smallest: 25,
        largest: 75,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 25,
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
        largest: 25,
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
        largest: 25,
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
        smallest: 5,
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
        largest: 95,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 5,
      });
      const isBottomStickSizeCorrect = isBetween(bottomStickHeightPercentage, {
        smallest: 5,
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
      return bodyHeightPercentage >= 100;
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
      return bodyHeightPercentage >= 100;
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
        candles[1].bodyHeightPercentage > candles[0].bodyHeightPercentage && // Main candles body height is larger than the previous candles
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
        candles[1].bodyHeightPercentage > candles[0].bodyHeightPercentage && // Main candles body height is larger than the previous candles
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
    name: "Piercing Line",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BULLISH && // Main candle is bullish
        candles[0].candleType == BEARISH && // previous candle is bearish
        candles[1].close > (candles[0].high + candles[0].low) / 2 && // Main candles close is above the midpoint of the previous candle
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
];

const realCandleBodySizePercentage = (candle) => {
  const realSizeOfMainCandle = candle.high - candle.low;
  const realSizeOfMainBody = Math.abs(candle.open - candle.close);
  return realSizeOfMainBody / realSizeOfMainCandle;
};

const tripleCandlePatterns = [];

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
/*

Morning star
Evening star

*/
