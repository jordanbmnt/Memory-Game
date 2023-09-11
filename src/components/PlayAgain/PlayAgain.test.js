import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import App from "../../App";
import configureMockStore from "redux-mock-store";

describe("App", () => {
  const mockStore = configureMockStore();
  const storeP = mockStore({
    cardFlipper: {
      secondClick: false,
      currentCard: {
        id: "cat",
        index: 2,
      },
      previousCard: {
        id: "cat",
        index: 2,
      },
      flippedCards: [1, 2, 1, 1],
      boardDimensions: {
        rows: 6,
        cardCount: 4,
        cardDistance: 20,
        scale: 0.8,
      },
      imageList: ["cat", "boy", "cat", "boy"],
      popUp: true,
    },
  });
  const setup = (store) => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  beforeEach(() => {
    setup(storeP);
  });
  it("should show popUp when all cards match", function () {
    expect(
      screen.getByRole("heading", { name: /congratulations/i })
    ).toBeInTheDocument();
  });
});
