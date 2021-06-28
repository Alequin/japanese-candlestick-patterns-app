import { BEARISH, BULLISH } from "./candle-types";

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

export const singleCandlePatterns = [
  {
    name: "Spinning Top",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 40,
        bottomStickHeightPercentage: 40,
      },
    ],
  },
  {
    name: "Standard Doji",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 97.5,
        bottomStickHeightPercentage: 97.5,
      },
    ],
  },
  {
    name: "Gravestone Doji",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 95,
        bottomStickHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Dragon Fly Doji",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
      },
    ],
  },
  {
    name: "Four Price Doji",
    doesCandlesMatchPattern: ({ high, low, open, close }) => {
      return [high, low, open, close].every(
        (value) => Number(value) === Number(high)
      );
    },
    exampleCandles: [
      {
        bodyHeightPercentage: 100,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Hammer" /*Paper mbrella*/,
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
      },
    ],
  },
  {
    name: "Hanging Man" /*Pper umbrella*/,
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
      },
    ],
  },
  {
    name: "Inverted Hammer" /*Paper umbrella*/,
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
      },
    ],
  },
  {
    name: "Shooting Star",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 95,
      },
    ],
  },
  {
    name: "Bullish Belt Hol",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 80,
        topStickHeightPercentage: 20,
        bottomStickHeightPercentage: 0,
      },
    ],
  },
  {
    name: "Bearish Belt Hol",
    doesCandlesMatchPattern: ({
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
        bodyHeightPercentage: 80,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 20,
      },
    ],
  },
  {
    name: "Bullish Marubozu",
    doesCandlesMatchPattern: ({ bodyHeightPercentage, candleType }) => {
      if (candleType !== BULLISH) return false;
      return bodyHeightPercentage >= 100;
    },
    exampleCandle: {
      bodyHeightPercentage: 100,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 0,
    },
  },
  {
    name: "Bearish Marubozu",
    doesCandlesMatchPattern: ({ bodyHeightPercentage, candleType }) => {
      if (candleType !== BEARISH) return false;
      return bodyHeightPercentage >= 100;
    },
    exampleCandle: {
      bodyHeightPercentage: 100,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 0,
    },
  },
];

export const doubleCandlePatterns = [];

/*

Morning star
Evening star

*/
