import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store.js";
import App from "../../App";
import { act } from "react-dom/test-utils";

describe("Board", () => {
  let card1;
  let card2;
  let randomCard;
  let card1Img;

  const setup = () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  beforeEach(() => {
    setup();
    card1 = screen.queryAllByTestId("card")[0];
    card1Img = screen
      .queryAllByTestId("card")[0]
      .childNodes[1].className.split(" ")[5];
    for (let i = 1; i < screen.queryAllByTestId("card").length; i++) {
      const card = screen.queryAllByTestId("card")[i];
      if (card.childNodes[1].className.split(" ")[5] === card1Img) {
        card2 = card;
      } else {
        randomCard = card;
      }
    }
  });

  it("should have 12 cards on the screen by default", () => {
    expect(screen.queryAllByTestId("card").length).toBe(12);
  });

  it("should keep the cards flipped after matching two of the same cards", async () => {
    await act(async () => {
      card1.childNodes[0].click();
      card2.childNodes[0].click();
    });

    expect(card1.style.transform === card2.style.transform).toBe(true);
    await act(async () => {
      randomCard.childNodes[0].click();
    });
    expect(card1.style.transform === card2.style.transform).toBe(true);
  });

  it("should disable the flip feature if cards have been flipped and matched", async () => {
    await act(async () => {
      card1.childNodes[0].click();
      card2.childNodes[0].click();
    });

    expect(card1.style.transform === card2.style.transform).toBe(true);
    await act(async () => {
      card1.childNodes[0].click();
    });
    expect(store.getState().cardFlipper.currentCard.id).toBe(null);
  });
});
