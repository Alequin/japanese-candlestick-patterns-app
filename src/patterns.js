import { BEARISH, BULLISH } from "./candle-types";

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

export const singleCandlePatterns = [
  {
    name: "Spinning Top",
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 5,
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
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 5,
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
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 5,
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
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 0,
        largest: 5,
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
    doCandlesMatchPattern: ({ high, low, open, close }) => {
      return [high, low, open, close].every(
        (value) => Number(value) === Number(high)
      );
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
    name: "Hammer" /*Paper umbrella*/,
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 5,
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Hanging Man" /*Paper umbrella*/,
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 5,
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Inverted Hammer" /*Paper umbrella*/,
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 5,
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Shooting Star",
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 5,
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
        bottomSpaceHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bullish belt Hold",
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
      candleType,
    }) => {
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
        largest: 0,
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
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
      candleType,
    }) => {
      if (candleType !== BEARISH) return false;

      const isBodyHightCorrect = isBetween(bodyHeightPercentage, {
        smallest: 75,
        largest: 95,
      });
      const isTopStickSizeCorrect = isBetween(topStickHeightPercentage, {
        smallest: 0,
        largest: 0,
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
    doCandlesMatchPattern: ({ bodyHeightPercentage, candleType }) => {
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
    doCandlesMatchPattern: ({ bodyHeightPercentage, candleType }) => {
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

export const doubleCandlePatterns = [
  {
    name: "Bullish Engulfing",
    doCandlesMatchPattern: (candles) => {
      return (
        candles[1].candleType === BULLISH && // Main candle is bullish
        candles[0].candleType == BEARISH && // previous candle is bearish
        candles[1].totalHeight > candles[0].totalHeight && // Main candles total height is larger than the previous candles
        candles[1].bodyHeightPercentage > candles[0].bodyHeightPercentage && // Main candles body height is larger than the previous candles
        candles[1].close > candles[0].open && // Main candles close price is more than previous candles open price
        candles[1].open <= candles[0].close // Main candles open price is less than or equal to previous candles close price
      );
    },
    exampleCandles: [
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 20,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 30,
        bottomStickHeightPercentage: 20,
        bottomSpaceHeightPercentage: 20,
      },
      {
        candleType: BULLISH,
        topSpaceHeightPercentage: 15,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 50,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 15,
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
        topSpaceHeightPercentage: 20,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 30,
        bottomStickHeightPercentage: 20,
        bottomSpaceHeightPercentage: 20,
      },
      {
        candleType: BEARISH,
        topSpaceHeightPercentage: 15,
        topStickHeightPercentage: 10,
        bodyHeightPercentage: 50,
        bottomStickHeightPercentage: 10,
        bottomSpaceHeightPercentage: 15,
      },
    ],
  },
];

export const allPatterns = [...singleCandlePatterns, ...doubleCandlePatterns];
/*

Morning star
Evening star

*/
