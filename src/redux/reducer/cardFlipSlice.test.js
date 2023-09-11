/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import cardFlipperReducer, {
  setCurrentCard,
  setPreviousCard,
  setSecondClick,
  setFlippedCards,
  setImageList,
  setPopUp,
  setStateToInitialState,
  setStartTime,
  setCardFlipCount,
} from "./cardFlipSlice";

describe("CardFlipSlice", () => {
  const initialState = {
    secondClick: false,
    currentCard: { id: null, index: null },
    previousCard: { id: null, index: null },
    flippedCards: [],
    boardDimensions: {
      rows: 3,
      cardCount: 12,
      cardDistance: 3,
      scale: 0.7,
    },
    imageList: [],
    popUp: false,
    startTime: "",
    cardFlipCount: 0,
  };
  it("setCurrentCard should update the initial states currentCard", () => {
    const nextState = cardFlipperReducer(
      initialState,
      setCurrentCard({ id: 1, index: "tiger" })
    );
    expect(nextState.currentCard.id).toBe(1);
    expect(nextState.currentCard.index).toBe("tiger");
  });
  it("setPreviousCard should update the initial states previousCard", () => {
    const nextState = cardFlipperReducer(
      initialState,
      setPreviousCard({ id: 0, index: "tiger" })
    );
    expect(nextState.previousCard.id).toBe(0);
    expect(nextState.previousCard.index).toBe("tiger");
  });
  it("setSecondClick should update the initial states secondClick", () => {
    const nextState = cardFlipperReducer(initialState, setSecondClick(true));
    expect(nextState.secondClick).toBe(true);
  });
  it("setFlippedCards should push to the initial states flippedCards array", () => {
    const nextState = cardFlipperReducer(initialState, setFlippedCards("boy"));
    expect(nextState.flippedCards).toEqual(["boy"]);
  });
  it("setImageList should update the initial states imageList", () => {
    const nextState = cardFlipperReducer(initialState, setImageList(["car"]));
    expect(nextState.imageList).toEqual(["car"]);
  });
  it("setPopUp should toggle the initial states popUp", () => {
    const nextState = cardFlipperReducer(initialState, setPopUp());
    expect(nextState.popUp).toBe(true);
  });
  it("startTime should update the startTime state", () => {
    const nextState = cardFlipperReducer(initialState, setStartTime("10:20"));
    expect(nextState.startTime).toBe("10:20");
  });
  it("cardFlipCount should increment the cardFlipCount state", () => {
    const nextState = cardFlipperReducer(initialState, setCardFlipCount());
    expect(nextState.cardFlipCount).toBe(1);
  });
  it("setStateToInitialState should reset the initial state", () => {
    const updatedState = {
      secondClick: true,
      currentCard: { id: 1, index: "tiger" },
      previousCard: { id: 0, index: "ostrich" },
      flippedCards: [],
      boardDimensions: { rows: 3, cardCount: 12, cardDistance: 3, scale: 0.7 },
      imageList: [],
      popUp: false,
      startTime: "",
      cardFlipCount: 0,
    };
    let nextState = cardFlipperReducer(initialState, setSecondClick(true));
    nextState = cardFlipperReducer(
      nextState,
      setCurrentCard({ id: 1, index: "tiger" })
    );
    nextState = cardFlipperReducer(
      nextState,
      setPreviousCard({ id: 0, index: "ostrich" })
    );
    expect(nextState).toEqual(updatedState);

    nextState = cardFlipperReducer(nextState, setStateToInitialState());
    expect(nextState).toEqual(initialState);
  });
});
