import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store/store.js";
import App from "../../App";
import { act } from "react-dom/test-utils";

describe("ResetButton", () => {
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

  it("should flip over all clicked cards", async () => {
    await act(async () => {
      card.childNodes[0].click();
    });

    expect(card.style.transform).toEqual("rotateY(180deg) translate(-15px)");

    await act(async () => {
      screen.queryAllByTestId("reset-button")[0].click();
    });

    expect(card.style.transform).toEqual("");
  });
});
