import { render, waitFor, act, fireEvent } from "@testing-library/react-native";

export const asyncRender = async (component) =>
  waitFor(() => render(component));

export const asyncPressEvent = async (button) =>
  act(async () => fireEvent.press(button));
