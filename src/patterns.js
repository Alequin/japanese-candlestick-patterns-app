import { BEARISH, BULLISH, NEUTRAL } from "./candle-types";

const newExamplePattern = (
  name,
  candleType,
  { doesCandleMatchPatten, exampleCandle }
) => ({
  name,
  doesCandleMatchPatten,
  candleType,
  exampleCandle: {
    candleType,
    ...exampleCandle,
  },
});

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

export const patterns = [
  newExamplePattern("Spinning Top", NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 20,
      topStickHeightPercentage: 40,
      bottomStickHeightPercentage: 40,
    },
  }),
  newExamplePattern("Standard Doji", NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 97.5,
      bottomStickHeightPercentage: 97.5,
    },
  }),
  newExamplePattern("Gravestone Doji", NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 95,
      bottomStickHeightPercentage: 0,
    },
  }),
  newExamplePattern("Dragon Fly Doji", NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 95,
    },
  }),
  newExamplePattern("Four Price Doji", NEUTRAL, {
    doesCandleMatchPatten: ({ high, low, open, close }) => {
      return [high, low, open, close].every(
        (value) => Number(value) === Number(high)
      );
    },
    exampleCandle: {
      bodyHeightPercentage: 100,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 0,
    },
  }),
  newExamplePattern("Hammer" /*Paper umbrella*/, NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 95,
    },
  }),
  newExamplePattern("Hanging Man" /*Paper umbrella*/, NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 95,
    },
  }),
  newExamplePattern("Inverted Hammer" /*Paper umbrella*/, NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 95,
    },
  }),
  newExamplePattern("Shooting Star", NEUTRAL, {
    doesCandleMatchPatten: ({
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
    exampleCandle: {
      bodyHeightPercentage: 5,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 95,
    },
  }),
  newExamplePattern("Bullish Belt Hold", BULLISH, {
    doesCandleMatchPatten: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
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
    exampleCandle: {
      bodyHeightPercentage: 80,
      topStickHeightPercentage: 20,
      bottomStickHeightPercentage: 0,
    },
  }),
  newExamplePattern("Bearish Belt Hold", BEARISH, {
    doesCandleMatchPatten: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
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
    exampleCandle: {
      bodyHeightPercentage: 80,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 20,
    },
  }),
  newExamplePattern("Bullish Marubozu", BULLISH, {
    doesCandleMatchPatten: () => false,
    exampleCandle: {
      bodyHeightPercentage: 100,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 0,
    },
  }),
  newExamplePattern("Bearish Marubozu", BEARISH, {
    doesCandleMatchPatten: () => false,
    exampleCandle: {
      bodyHeightPercentage: 100,
      topStickHeightPercentage: 0,
      bottomStickHeightPercentage: 0,
    },
  }),
];

/*

Morning star
Evening star

*/
