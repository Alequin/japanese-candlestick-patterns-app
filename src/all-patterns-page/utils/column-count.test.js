jest.mock("react-native/Libraries/Utilities/Dimensions", () => ({
  get: jest.fn(),
}));
import { Dimensions } from "react-native";
import { columnCount } from "./column-count";

describe("column count", () => {
  describe("Returns 1 when the screen size is less than 350", () => {
    it.each([349, 300, 250])("when the screen width is %s", (width) => {
      Dimensions.get.mockReturnValue({ width });
      expect(columnCount()).toBe(1);
    });
  });

  describe("Returns 2 when the screen size is between than 350 & 600", () => {
    it.each([599, 475, 350])("when the screen width is %s", (width) => {
      Dimensions.get.mockReturnValue({ width });
      expect(columnCount()).toBe(2);
    });
  });

  describe("Returns 3 when the screen size is greater than or equal to 600", () => {
    it.each([600, 10_000])("when the screen width is %s", (width) => {
      Dimensions.get.mockReturnValue({ width });
      expect(columnCount()).toBe(3);
    });
  });
});
