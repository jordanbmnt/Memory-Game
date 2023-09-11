import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store.js";
import App from "../../App";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

describe("FlipCard", () => {
  let card;
  const setup = () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  beforeEach(() => {
    setup();
    card = screen.queryAllByTestId("card")[0];
  });

  it("should render flip-cards in App component", () => {
    expect(card).toBeInTheDocument();
    expect(
      card.childNodes[0].className.split(" ").includes("flip-card-front")
    ).toBe(true);
    expect(
      card.childNodes[1].className.split(" ").includes("flip-card-back")
    ).toBe(true);
  });

  it("should flip a flip-card when clicked", async () => {
    await act(async () => {
      card.childNodes[0].click();
    });

    expect(card.style.transform).toEqual("rotateY(180deg) translate(-15px)");
  });
});
