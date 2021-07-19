jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

import { within } from "@testing-library/react-native";
import React from "react";
import { App } from "../App";
import {
  allPatterns,
  doubleCandlePatterns,
  singleCandlePatterns,
  tripleCandlePatterns,
} from "../src/patterns/patterns";
import { asyncPressEvent, asyncRender } from "../src/test-utils";

describe("All Patterns Page", () => {
  describe("pattern list page", () => {
    it("Shows the pattern list page by default", async () => {
      const { getByTestId } = await asyncRender(<App />);
      expect(getByTestId("patternListPage")).toBeTruthy();
    });

    it("Lists all the patterns as buttons", async () => {
      const { getByTestId } = await asyncRender(<App />);

      const patternListPage = getByTestId("patternListPage");
      const allButtons = within(patternListPage).getAllByRole("button");

      allPatterns.forEach(({ name }) =>
        expect(
          allButtons.find((button) => within(button).queryByText(name))
        ).toBeTruthy()
      );
    });
  });

  describe("pattern overview page", () => {
    describe("Pressing a pattern button opens the pattern overview", () => {
      it.each(allPatterns.map(({ name }) => name))(
        "When the pattern name is %s",
        async (patternName) => {
          const { getByTestId } = await asyncRender(<App />);

          const patternListPage = getByTestId("patternListPage");
          const allButtons = within(patternListPage).getAllByRole("button");

          const patternButton = allButtons.find((button) =>
            within(button).queryByText(patternName)
          );

          // 1. Press the patterns button
          await asyncPressEvent(patternButton);

          // 2. Confirm the pattern overview page is for the correct pattern
          const patternOverviewPage = getByTestId("patternOverviewPage");

          expect(
            within(patternOverviewPage).getByRole("header", {
              name: patternName,
            })
          ).toBeTruthy();
        }
      );
    });

    describe("The pattern overview page shows the expected content", () => {
      it.each(allPatterns.map(({ name }) => name))(
        "When the pattern name is %s",
        async (patternName) => {
          const { getByTestId } = await asyncRender(<App />);

          const patternListPage = getByTestId("patternListPage");
          const allButtons = within(patternListPage).getAllByRole("button");

          const patternButton = allButtons.find((button) =>
            within(button).queryByText(patternName)
          );

          // 1. Press the patterns button
          await asyncPressEvent(patternButton);

          // 2. Confirm the pattern overview page is displaying the correct content
          const patternOverviewPage = getByTestId("patternOverviewPage");

          expect(
            within(patternOverviewPage).getByTestId(`${patternName} content`)
          ).toBeTruthy();
        }
      );
    });

    describe("Single pattern overviews shows one candle in their example", () => {
      it.each(singleCandlePatterns.map(({ name }) => name))(
        "When the pattern name is %s",
        async (patternName) => {
          const { getByTestId } = await asyncRender(<App />);

          const patternListPage = getByTestId("patternListPage");
          const allButtons = within(patternListPage).getAllByRole("button");

          const patternButton = allButtons.find((button) =>
            within(button).queryByText(patternName)
          );

          // 1. Press the patterns button
          await asyncPressEvent(patternButton);

          // 2. Confirm the example candle count is correct
          const patternOverviewPage = getByTestId("patternOverviewPage");
          expect(
            within(patternOverviewPage).getAllByTestId("candle")
          ).toHaveLength(1);
        }
      );
    });

    describe("Double pattern overviews shows two candles in their example", () => {
      it.each(doubleCandlePatterns.map(({ name }) => name))(
        "When the pattern name is %s",
        async (patternName) => {
          const { getByTestId } = await asyncRender(<App />);

          const patternListPage = getByTestId("patternListPage");
          const allButtons = within(patternListPage).getAllByRole("button");

          const patternButton = allButtons.find((button) =>
            within(button).queryByText(patternName)
          );

          // 1. Press the patterns button
          await asyncPressEvent(patternButton);

          // 2. Confirm the example candle count is correct
          const patternOverviewPage = getByTestId("patternOverviewPage");
          expect(
            within(patternOverviewPage).getAllByTestId("candle")
          ).toHaveLength(2);
        }
      );
    });

    //TODO unskip when triple candle patterns are added
    describe("Triple pattern overviews shows three candle in their example", () => {});

    it("Allows the user to return to the pattern list page from the pattern overview page", async () => {
      const { getByTestId } = await asyncRender(<App />);

      const patternListPage = getByTestId("patternListPage");
      const allButtons = within(patternListPage).getAllByRole("button");

      const patternButton = allButtons.find((button) =>
        within(button).queryByText("Spinning Top")
      );

      // 1. Press the pattern button
      await asyncPressEvent(patternButton);

      // 2. Confirm the pattern overview page is visible
      const patternOverviewPage = getByTestId("patternOverviewPage");

      // 3. Press the back button
      const backButton = within(patternOverviewPage)
        .queryByRole("button")
        .find((button) => within(button).queryByText("Back to all patterns"));
    });
  });
});
