import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import App from "./App";
import store from "./redux/store/store";
import { act } from "react-test-renderer";

describe("App", () => {
  let twoByTwo;
  let card;
  const setup = (store) => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    twoByTwo = screen.getByText(/2x2/i);
  };
  beforeEach(() => {
    setup(store);
    card = screen.queryAllByTestId("card")[0];
  });
  it("should render a dimension buttons", function () {
    expect(twoByTwo).toBeInTheDocument();
  });
  it("should show the time taken and amount of cards flipped", function () {
    expect(
      screen.getByRole("heading", {
        name: /Your Time: 0 hours, 0 minutes and 0 seconds | You flipped the cards 0 times/i,
      })
    ).toBeInTheDocument();
  });
  it("should display when the cardFlip count increases", async function () {
    await act(async () => {
      card.childNodes[0].click();
    });
    expect(screen.getByTestId("timeTaken").innerHTML).toBe(
      "Your Time: 0 hours, 0 minutes and 0 seconds | You flipped the cards 1 times"
    );
  });
});
