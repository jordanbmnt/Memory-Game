import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import App from "../../App";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

describe("DimensionsBox", () => {
  let card;
  let twoByTwo;
  let twoByThree;
  let twoByFour;
  let threeByFour;
  let fourByFour;
  const setup = () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  beforeEach(() => {
    setup();
    card = screen.queryAllByTestId("card");
    twoByTwo = screen.getByText(/2x2/i);
    twoByThree = screen.getByText(/2x3/i);
    twoByFour = screen.getByText(/2x4/i);
    threeByFour = screen.getByText(/3x4/i);
    fourByFour = screen.getByText(/4x4/i);
  });
  it("should render the dimension buttons in App component", () => {
    expect(twoByTwo).toBeInTheDocument();
    expect(twoByThree).toBeInTheDocument();
    expect(twoByFour).toBeInTheDocument();
    expect(threeByFour).toBeInTheDocument();
    expect(fourByFour).toBeInTheDocument();
  });
  it("should change the dimensions of the board to 2X2 onclick", async () => {
    await act(async () => {
      twoByTwo.click();
    });
    expect(store.getState().cardFlipper.boardDimensions.cardCount).toBe(4);
  });
  it("should change the dimensions of the board to 2X3 onclick", async () => {
    await act(async () => {
      twoByThree.click();
    });
    expect(store.getState().cardFlipper.boardDimensions.cardCount).toBe(6);
  });
  it("should change the dimensions of the board to 2X4 onclick", async () => {
    await act(async () => {
      twoByFour.click();
    });
    expect(store.getState().cardFlipper.boardDimensions.cardCount).toBe(8);
  });
  it("should change the dimensions of the board to 3X4 onclick", async () => {
    await act(async () => {
      threeByFour.click();
    });
    expect(store.getState().cardFlipper.boardDimensions.cardCount).toBe(12);
  });
  it("should flip cards back to original position when the dimensions of the board is changed", async () => {
    await act(async () => {
      card[0].childNodes[0].click();
    });
    expect(card[0].style.transform).toBe("rotateY(180deg) translate(-15px)");
    await act(async () => {
      twoByTwo.click();
    });
    expect(card[0].style.transform).toBe("");
  });
});
