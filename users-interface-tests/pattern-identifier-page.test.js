jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../src/dimensions", () => ({
  windowHeight: jest.fn(),
  windowWidth: jest.fn().mockReturnValue(1000),
}));
jest.mock("react-native/Libraries/Components/Keyboard/Keyboard", () => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

import { within, act } from "@testing-library/react-native";
import React from "react";
import { Keyboard } from "react-native";
import { App } from "../App";
import { windowHeight } from "../src/dimensions";
import { PAGES } from "../src/navigation/pages";
import {
  asyncChangeInputText,
  asyncPressEvent,
  asyncRender,
} from "../src/test-utils";

describe("Pattern Identifier Page", () => {
  beforeEach(() => {
    windowHeight.mockReturnValue(1000);
    Keyboard.addListener.mockImplementation(() => ({
      remove: jest.fn(),
    }));
  });
  afterEach(() => jest.clearAllMocks());

  it("Shows the pattern identifier page when the tab button is pressed", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    expect(screen.getByTestId("patternIdentifierPage")).toBeTruthy();
  });

  it("Can return to the pattern list page after going to the pattern identifier page", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);
    await openPatternListPage(screen);

    expect(screen.getByTestId("patternListPage")).toBeTruthy();
  });

  it("Shows one candle in the candle view by default", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );
  });

  it("Shows the matching pattern section with no matching patterns by default", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    expect(
      within(patternIdentifierPage)
        .getAllByRole("header")
        .find(
          (header) => header.props.children === "Single CandleStick Patterns"
        )
    ).toBeTruthy();

    expect(
      within(patternIdentifierPage).getByText("No matching patterns")
    ).toBeTruthy();
  });

  it("Shows the default candle values in the inputs", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const candleInputs = within(
      screen.getByTestId("candleInputs")
    ).getAllByRole("button");

    // 1. Confirm the high input
    const highInputWrapper = candleInputs.find((inputWrapper) =>
      within(inputWrapper).queryByText("High:")
    );

    expect(highInputWrapper).toBeTruthy();
    const highInput = within(highInputWrapper).getByTestId("candleValueInput");
    expect(highInput.props.value).toBe("2.0000");

    // 2. Confirm the open input
    const openInputWrapper = candleInputs.find((inputWrapper) =>
      within(inputWrapper).queryByText("Open:")
    );

    expect(openInputWrapper).toBeTruthy();
    const openInput = within(openInputWrapper).getByTestId("candleValueInput");
    expect(openInput.props.value).toBe("1.2500");

    // 3. Confirm the low input
    const lowInputWrapper = candleInputs.find((inputWrapper) =>
      within(inputWrapper).queryByText("Low:")
    );

    expect(lowInputWrapper).toBeTruthy();
    const lowInput = within(lowInputWrapper).getByTestId("candleValueInput");
    expect(lowInput.props.value).toBe("1.0000");

    // 4. Confirm the close input
    const closeInputWrapper = candleInputs.find((inputWrapper) =>
      within(inputWrapper).queryByText("Close:")
    );

    expect(closeInputWrapper).toBeTruthy();
    const closeInput =
      within(closeInputWrapper).getByTestId("candleValueInput");
    expect(closeInput.props.value).toBe("1.7500");
  });

  it("Shows the help modal when the help icon is pressed", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const buttons = within(
      screen.getByTestId("patternIdentifierPage")
    ).getAllByRole("button");

    // 1. Press the help button
    const helpButton = buttons.find((button) =>
      within(button).queryByTestId("questionCircleIcon")
    );
    await asyncPressEvent(helpButton);

    // 2. Confirm the help modal is open
    expect(
      screen
        .getAllByRole("header")
        .find(
          (header) => header.props.children === "Using the Pattern Identifier"
        )
    ).toBeTruthy();
  });

  it("Allows the user to use 2 candles with the pattern identifier", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Starts with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Presses the add candle button
    const buttons = within(patternIdentifierPage).getAllByRole("button");
    const addCandleButton = buttons.find((button) =>
      within(button).queryByText("Add Candle")
    );
    await asyncPressEvent(addCandleButton);

    // 3. Confirm 2 candles are visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      2
    );

    // 4. Confirm the title of the matching patterns section is correct
    expect(
      within(patternIdentifierPage)
        .getAllByRole("header")
        .find(
          (header) => header.props.children === "Double CandleStick Patterns"
        )
    ).toBeTruthy();
  });

  it("Allows the user to use 3 candles with the pattern identifier", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Starts with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Presses the add candle button twice
    const buttons = within(patternIdentifierPage).getAllByRole("button");
    const addCandleButton = buttons.find((button) =>
      within(button).queryByText("Add Candle")
    );
    await asyncPressEvent(addCandleButton);
    await asyncPressEvent(addCandleButton);

    // 3. Confirm 3 candles are visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      3
    );

    // 4. Confirm the title of the matching patterns section is correct
    expect(
      within(patternIdentifierPage)
        .getAllByRole("header")
        .find(
          (header) => header.props.children === "Triple CandleStick Patterns"
        )
    ).toBeTruthy();
  });

  it("Does not allow more than 3 candles to be added to the pattern identifier", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Starts with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Presses the add candle button three times
    const buttons = within(patternIdentifierPage).getAllByRole("button");
    const addCandleButton = buttons.find((button) =>
      within(button).queryByText("Add Candle")
    );
    await asyncPressEvent(addCandleButton);
    await asyncPressEvent(addCandleButton);
    await asyncPressEvent(addCandleButton);

    // 3. Confirm no more than 3 candles are visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      3
    );
  });

  it("Does not allow candles to be removed when there is only 1", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Starts with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Attempt to remove a candle
    const buttons = within(patternIdentifierPage).getAllByRole("button");
    const removeCandleButton = buttons.find((button) =>
      within(button).queryByText("Remove Candle")
    );
    await asyncPressEvent(removeCandleButton);

    // 3. Confirm there is still only one candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );
  });

  it("Allows candles to be removed once they have been added", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Start with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Press the add candle button twice
    const addCandleButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Add Candle"));
    await asyncPressEvent(addCandleButton);
    await asyncPressEvent(addCandleButton);

    // 3. Confirm 3 candles are visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      3
    );

    // 4. Select the third candle
    const thirdCandleButton = within(patternIdentifierPage).queryByTestId(
      "candleButton-2"
    );
    await asyncPressEvent(thirdCandleButton);

    // 5. Press the remove candle button twice
    const removeCandleButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Remove Candle"));
    await asyncPressEvent(removeCandleButton);
    await asyncPressEvent(removeCandleButton);

    // 6. Confirm only 1 candle is visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );
  });

  it("Allows candles to be select", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Start with one Candle
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      1
    );

    // 2. Press the add candle button twice
    const addCandleButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Add Candle"));
    await asyncPressEvent(addCandleButton);
    await asyncPressEvent(addCandleButton);

    // 3. Confirm 3 candles are visible
    expect(within(patternIdentifierPage).getAllByTestId("candle")).toHaveLength(
      3
    );

    // 4. Select different candles
    const secondCandleButton = within(patternIdentifierPage).queryByTestId(
      "candleButton-1"
    );
    await asyncPressEvent(secondCandleButton);

    const firstCandleButton = within(patternIdentifierPage).queryByTestId(
      "candleButton-0"
    );
    await asyncPressEvent(firstCandleButton);

    const thirdCandleButton = within(patternIdentifierPage).queryByTestId(
      "candleButton-2"
    );
    await asyncPressEvent(thirdCandleButton);

    // 5. Remove the candles
    const removeCandleButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Remove Candle"));
    await asyncPressEvent(removeCandleButton);
    await asyncPressEvent(removeCandleButton);
  });

  describe("Allows the candle input values to be cleared", () => {
    it.each(["High:", "Low:", "Open:", "Close:"])(
      "When the input controls the %s",
      async (candleInputName) => {
        const screen = await asyncRender(<App />);

        await openPatternIdentifierPage(screen);

        const candleInputs = within(
          screen.getByTestId("candleInputs")
        ).getAllByRole("button");

        // 1. Clear the input
        const inputWrapper = candleInputs.find((inputWrapper) =>
          within(inputWrapper).queryByText(candleInputName)
        );

        const cancelButton =
          within(inputWrapper).getByTestId("crossIcon").parent;
        await asyncPressEvent(cancelButton);

        const input = within(inputWrapper).getByTestId("candleValueInput");
        expect(input.props.value).toBe("");
      }
    );
  });

  it("Hides the identifier which the keyboard is visible if the window height is less than 600", async () => {
    let capturedSetKeyboardVisibleCallback = null;
    Keyboard.addListener.mockImplementation((eventName, callback) => {
      if (eventName === "keyboardDidShow")
        capturedSetKeyboardVisibleCallback = callback;

      return { remove: jest.fn() };
    });

    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Mock small screen height
    windowHeight.mockReturnValue(599);
    // 2. Show keyboard
    await act(async () => capturedSetKeyboardVisibleCallback());

    // 3. Confirm no candles are visible
    expect(
      within(patternIdentifierPage).queryAllByTestId("candle")
    ).toHaveLength(0);

    // 4. Confirm the matching pattern list is missing
    expect(
      within(patternIdentifierPage)
        .queryAllByRole("header")
        .find(
          (header) => header.props.children === "Single CandleStick Patterns"
        )
    ).toBeFalsy();

    expect(
      within(patternIdentifierPage).queryByText("No matching patterns")
    ).toBeFalsy();
  });

  it("Allows the pattern overview page to be viewed after a single candle pattern has been identified", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Confirm there are no matching patterns initially
    expect(
      within(patternIdentifierPage).getByText("No matching patterns")
    ).toBeTruthy();

    // 2. Update the candle values to match a pattern
    await updateCandleInputValue(screen, "Open", 1.4);
    await updateCandleInputValue(screen, "Close", 1.6);

    // 3. Confirm there is now a matching pattern and press the button
    const patternButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Spinning Top"));
    await asyncPressEvent(patternButton);

    // 4. Confirm the page has changed to the pattern overview
    const patternOverviewPage = screen.getByTestId("patternOverviewPage");

    expect(
      within(patternOverviewPage)
        .getAllByRole("header")
        .find((header) => header.props.children === "Spinning Top")
    ).toBeTruthy();
  });

  it("Allows the pattern overview page to be viewed after a double candle pattern has been identified", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    const patternIdentifierPage = screen.getByTestId("patternIdentifierPage");

    // 1. Confirm there are no matching patterns initially
    expect(
      within(patternIdentifierPage).getByText("No matching patterns")
    ).toBeTruthy();

    // 2. Presses the add candle button
    const buttons = within(patternIdentifierPage).getAllByRole("button");
    const addCandleButton = buttons.find((button) =>
      within(button).queryByText("Add Candle")
    );
    await asyncPressEvent(addCandleButton);

    // 3. Update the first candle values to match a pattern
    await updateCandleInputValue(screen, "High", 70);
    await updateCandleInputValue(screen, "Low", 30);
    await updateCandleInputValue(screen, "Open", 60);
    await updateCandleInputValue(screen, "Close", 35);

    // 4. Change to the next candle
    const secondCandleButton = within(patternIdentifierPage).queryByTestId(
      "candleButton-1"
    );
    await asyncPressEvent(secondCandleButton);

    // 5. Update the second candle values to match a pattern
    await updateCandleInputValue(screen, "High", 100);
    await updateCandleInputValue(screen, "Low", 20);
    await updateCandleInputValue(screen, "Open", 35);
    await updateCandleInputValue(screen, "Close", 70);

    // 6. Confirm there is now a matching pattern and press the button
    const patternButton = within(patternIdentifierPage)
      .getAllByRole("button")
      .find((button) => within(button).queryByText("Bullish Engulfing"));
    await asyncPressEvent(patternButton);

    // 7. Confirm the page has changed to the pattern overview
    const patternOverviewPage = screen.getByTestId("patternOverviewPage");

    expect(
      within(patternOverviewPage)
        .getAllByRole("header")
        .find((header) => header.props.children === "Bullish Engulfing")
    ).toBeTruthy();
  });

  // TODO - add when there are triple candlestick patterns
  it.todo(
    "Allows the pattern overview page to be viewed after a triple candle pattern has been identified"
  );

  describe("Shows an error message when any of the inputs are missing a value", () => {
    it.each(["Open", "High", "Low", "Close"])(
      "When the input controls the %s",
      async (candleInputName) => {
        const screen = await asyncRender(<App />);

        await openPatternIdentifierPage(screen);

        const candleInputs = within(
          screen.getByTestId("candleInputs")
        ).getAllByRole("button");

        // 1. Clear the input
        const inputWrapper = candleInputs.find((inputWrapper) =>
          within(inputWrapper).queryByText(`${candleInputName}:`)
        );

        const cancelButton =
          within(inputWrapper).getByTestId("crossIcon").parent;
        await asyncPressEvent(cancelButton);

        const input = within(inputWrapper).getByTestId("candleValueInput");
        expect(input.props.value).toBe("");

        // 2. Confirm the error message
        expect(
          screen.getByText(
            new RegExp(
              `Invalid Candle: Missing ${candleInputName.toLowerCase()} price`
            )
          )
        ).toBeTruthy();
      }
    );
  });

  it("Shows an error when the high price is less than the low price", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input values
    await updateCandleInputValue(screen, "High", 50);
    await updateCandleInputValue(screen, "Low", 100);

    // 2. Confirm the error message
    expect(
      screen.getByText(/Invalid Candle: The high is less than the low/)
    ).toBeTruthy();
  });

  it("Shows an error when the open price is greater than the high price", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input values
    await updateCandleInputValue(screen, "Open", 120);
    await updateCandleInputValue(screen, "High", 100);

    // 2. Confirm the error message
    expect(
      screen.getByText(/Invalid Candle: The open is greater than the high/)
    ).toBeTruthy();
  });

  it("Shows an error when the open price is less than the low price", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input values
    await updateCandleInputValue(screen, "Open", 0.5);
    await updateCandleInputValue(screen, "Low", 1);

    // 2. Confirm the error message
    expect(
      screen.getByText(/Invalid Candle: The open is less than the low/)
    ).toBeTruthy();
  });

  it("Shows an error when the close price is greater than the high price", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input values
    await updateCandleInputValue(screen, "Close", 120);
    await updateCandleInputValue(screen, "High", 100);

    // 2. Confirm the error message
    expect(
      screen.getByText(/Invalid Candle: The close is greater than the high/)
    ).toBeTruthy();
  });

  it("Shows an error when the close price is less than the low price", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input values
    await updateCandleInputValue(screen, "Close", 0.5);
    await updateCandleInputValue(screen, "Low", 1);

    // 2. Confirm the error message
    expect(
      screen.getByText(/Invalid Candle: The close is less than the low/)
    ).toBeTruthy();
  });

  it("Shows an error icon in place of the candle when there is a issue", async () => {
    const screen = await asyncRender(<App />);

    await openPatternIdentifierPage(screen);

    // 1. Update the input value to create an issue
    await updateCandleInputValue(screen, "High", "");

    // 2. Confirm the candle has been removed
    const candleView = screen.getByTestId("candleView");

    expect(within(candleView).queryAllByTestId("candle")).toHaveLength(0);

    // 3. Confirm the icon has taken the candles place
    expect(within(candleView).getByTestId("warningOutlineIcon")).toBeTruthy();
  });
});

const updateCandleInputValue = async (screen, inputName, inputValue) => {
  const candleInputs = within(screen.getByTestId("candleInputs")).getAllByRole(
    "button"
  );

  const inputWrapper = candleInputs.find((inputWrapper) =>
    within(inputWrapper).queryByText(`${inputName}:`)
  );

  const input = within(inputWrapper).getByTestId("candleValueInput");
  await asyncChangeInputText(input, inputValue);
};

const openPatternIdentifierPage = async (screen) => {
  const patternIdentifierTabIcon = screen.getByText(
    PAGES.patternIdentifier
  ).parent;
  await asyncPressEvent(patternIdentifierTabIcon);

  expect(screen.getByTestId("patternIdentifierPage")).toBeTruthy();
};

const openPatternListPage = async (screen) => {
  const patternListTabIcon = screen.getByText(PAGES.allCandlesPatterns).parent;
  await asyncPressEvent(patternListTabIcon);

  expect(screen.getByTestId("patternListPage")).toBeTruthy();
};
