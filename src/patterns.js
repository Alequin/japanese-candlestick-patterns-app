import React from "react";
import { BEARISH, BULLISH } from "./candle-types";
import {
  BulletPoint,
  TextSection,
  Title,
} from "./shared-components/pattern-content-components";

const isBetween = (value, { smallest, largest }) =>
  value >= smallest && value <= largest;

const PATTERN_MEANING_SECTION_TITLE = "What does this pattern tell you?";
const PATTERN_DESCRIPTION_SECTION_TITLE = "How to identify the pattern";

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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Spinning Top indicates indecision and uncertainty in the market.
          It may signal the market is about to reverse from the current trend or
          a period of consolidation is about the start.
        </TextSection>
        <TextSection>
          If a Spinning Top candle forms, it is recommended to look for
          confirmation from other forms of analysis before trading.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle has a short body.</BulletPoint>
        <BulletPoint>
          The candle body will be centred between long upper and lower shadows
        </BulletPoint>
        <BulletPoint>The candle can be either bullish or bearish</BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Doji indicates indecision and uncertainty in the market. It may
          signal the market is about to reverse from the current trend.
        </TextSection>
        <TextSection>
          If seen in a period of consolidation, it can signal a potential
          breakout.
        </TextSection>

        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>
          The candle has a very short body, with almost equal open and close
          prices
        </BulletPoint>
        <BulletPoint>
          The candle body will be centred between long upper and lower shadows
        </BulletPoint>
        <BulletPoint>The candle can be either bullish or bearish</BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Gravestone Doji signals a bearish reversal and is seen usually at
          the end of an uptrend. The longer the upper shadow, the stronger the
          pattern.
        </TextSection>
        <TextSection>
          The top of the upper shadow may also identify resistance points where
          the bulls lost momentum.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>
          The candle has a very short body, with almost equal open, close and
          low prices
        </BulletPoint>
        <BulletPoint>
          The candle body will be very close to the low price with little to no
          lower shadow visible
        </BulletPoint>
        <BulletPoint>
          The candles upper shadow should be long. The longer, the better
        </BulletPoint>
        <BulletPoint>The candle can be either bullish or bearish</BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Dragonfly Doji signals a bullish reversal and is seen usually at
          the end of an downtrend. The longer the lower shadow, the stronger the
          pattern.
        </TextSection>
        <TextSection>
          The bottom of the lower shadow may also identify resistance points
          where the bears lost momentum.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>
          The candle has a very short body, with almost equal open, close and
          high prices
        </BulletPoint>
        <BulletPoint>
          The candle body will be very close to the high price with little to no
          lower shadow visible
        </BulletPoint>
        <BulletPoint>
          The candles lower shadow should be long. The longer, the better
        </BulletPoint>
        <BulletPoint>The candle can be either bullish or bearish</BulletPoint>
      </>
    ),
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
        bodyHeightPercentage: 5,
        topStickHeightPercentage: 0,
        bottomStickHeightPercentage: 0,
        bottomSpaceHeightPercentage: 0,
      },
    ],
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Four-price Doji indicates a lack of interest from both buyers and
          sellers, meaning there is very little volatility in the market. It may
          signal an opportunity to close any open positions.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>
          The candles open, close, high and low values will be equal or close to
          equal
        </BulletPoint>
        <BulletPoint>
          There will be very little or no upper and lower shadows
        </BulletPoint>
        <BulletPoint>The candle can be either bullish or bearish</BulletPoint>
      </>
    ),
  },
  {
    name: "Hammer",
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Hammer signals a potential bullish reversal after a recent
          downtrend. The low price may also be used to identify points of
          resistance.
        </TextSection>
        <TextSection>
          The pattern is strongest when the candle is bullish, and the close
          price is similar to the high. The pattern is still valid if the candle
          is bearish, just less reliable.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle will appear after a downtrend</BulletPoint>

        <BulletPoint>
          The following candle will preferably show the price increasing, which
          confirms the pattern
        </BulletPoint>
        <BulletPoint>
          The candle should preferably be bullish, though a bearish candle is
          still valid
        </BulletPoint>
        <BulletPoint>The candle has a small body</BulletPoint>
        <BulletPoint>The candle has little to know upper shadow</BulletPoint>
        <BulletPoint>
          The candle has a long lower shadow that is at least twice the size of
          the body
        </BulletPoint>
      </>
    ),
  },
  {
    name: "Hanging Man" /*Paper umbrella*/,
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Hanging Man signals a potential bearish reversal after a recent
          uptrend. The long lower shadow indicates more traders are opposing the
          current trend and are selling.
        </TextSection>
        <TextSection>
          The pattern is strongest when the candle is bearish. The pattern is
          still valid if the candle is bullish, just less reliable.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle will appear after a uptrend</BulletPoint>

        <BulletPoint>
          The following candle will preferably show the price decreasing, which
          confirms the pattern
        </BulletPoint>
        <BulletPoint>The candle has a small body</BulletPoint>
        <BulletPoint>The candle has little to know upper shadow</BulletPoint>
        <BulletPoint>
          The candle has a long lower shadow that is at least twice the size of
          the body
        </BulletPoint>
        <BulletPoint>
          The candle should preferably be bearish, though a bullish candle is
          still valid
        </BulletPoint>
      </>
    ),
  },
  {
    name: "Inverted Hammer" /*Paper umbrella*/,
    doCandlesMatchPattern: ({
      topStickHeightPercentage,
      bottomStickHeightPercentage,
      bodyHeightPercentage,
    }) => {
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Inverted Hammer signals a potential bullish reversal after a
          recent downtrend.
        </TextSection>
        <TextSection>
          The pattern is strongest when the candle is bullish. The pattern is
          still valid if the candle is bearish, just less reliable.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle will appear after a downtrend</BulletPoint>

        <BulletPoint>
          The following candle will preferably show the price increasing, which
          confirms the pattern
        </BulletPoint>
        <BulletPoint>The candle has a small body</BulletPoint>
        <BulletPoint>The candle has little to know lower shadow</BulletPoint>
        <BulletPoint>
          The candle has a long upper shadow that is at least twice the size of
          the body
        </BulletPoint>
        <BulletPoint>
          The candle should preferably be bullish, though a bearish candle is
          still valid
        </BulletPoint>
      </>
    ),
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
        bodyHeightPercentage: 20,
        topStickHeightPercentage: 78,
        bottomStickHeightPercentage: 2,
        bottomSpaceHeightPercentage: 0,
      },
    ],
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Shooting Star signals a potential bearish reversal after a recent
          uptrend.
        </TextSection>
        <TextSection>
          The pattern is strongest when the candle is bearish. The pattern is
          still valid if the candle is bullish, just less reliable.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle will appear after a uptrend</BulletPoint>
        <BulletPoint>
          The following candle will preferably show the price decreasing, which
          confirms the pattern
        </BulletPoint>
        <BulletPoint>The candle has a small body</BulletPoint>
        <BulletPoint>The candle has little to know lower shadow</BulletPoint>
        <BulletPoint>
          The candle has a long upper shadow that is at least twice the size of
          the body
        </BulletPoint>
        <BulletPoint>
          The candle should preferably be bearish, though a bullish candle is
          still valid
        </BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Bullish belt Hold signals a potential bullish reversal after a
          recent downtrend.
        </TextSection>
        <TextSection>
          The pattern is not always reliable but should be considered stronger
          if it forms near a support level
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle has no lower shadow</BulletPoint>
        <BulletPoint>The candle has a large body</BulletPoint>
        <BulletPoint>
          The larger the candle the more reliable the pattern
        </BulletPoint>
        <BulletPoint>The candle has small upper shadow</BulletPoint>
        <BulletPoint>
          The following candle should be bullish to confirm the pattern
        </BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Bearish belt Hold signals a potential bearish reversal after a
          recent uptrend.
        </TextSection>
        <TextSection>
          The pattern is not always reliable but should be considered stronger
          if it forms near a resistance level
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle has no upper shadow</BulletPoint>
        <BulletPoint>The candle has a large body</BulletPoint>
        <BulletPoint>
          The larger the candle the more reliable the pattern
        </BulletPoint>
        <BulletPoint>The candle has small lower shadow</BulletPoint>
        <BulletPoint>
          The following candle should be bearish to confirm the pattern
        </BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Bullish Marubozu signals further bullish sentiment regardless of
          the trend prior to the candle.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle has no shadows</BulletPoint>
        <BulletPoint>The candles body takes up the entire candle</BulletPoint>
        <BulletPoint>
          The larger the candle the more reliable the pattern
        </BulletPoint>
      </>
    ),
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
    content: (
      <>
        <Title>{PATTERN_MEANING_SECTION_TITLE}</Title>
        <TextSection>
          The Bearish Marubozu signals further bearish sentiment regardless of
          the trend prior to the candle.
        </TextSection>
        <Title>{PATTERN_DESCRIPTION_SECTION_TITLE}</Title>
        <BulletPoint>The candle has no shadows</BulletPoint>
        <BulletPoint>The candles body takes up the entire candle</BulletPoint>
        <BulletPoint>
          The larger the candle the more reliable the pattern
        </BulletPoint>
      </>
    ),
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
