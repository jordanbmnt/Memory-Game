import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  secondClick: false,
  currentCard: { id: null, index: null },
  previousCard: { id: null, index: null },
  flippedCards: [],
  boardDimensions: {
    rows: 3,
    cardCount: 12,
    cardDistance: 7,
    scale: 0.5,
  },
  imageList: [],
  popUp: false,
  startTime: "",
  cardFlipCount: 0,
};

export const cardFlipperSlice = createSlice({
  name: "cardFlipper",
  initialState: initialState,
  reducers: {
    setSecondClick: (state, action) => {
      state.secondClick = action.payload;
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    setPreviousCard: (state, action) => {
      state.previousCard = action.payload;
    },
    setFlippedCards: (state, action) => {
      state.flippedCards.push(action.payload);
    },
    setStateToInitialState: (state) => {
      state.secondClick = false;
      state.currentCard = { id: null, index: null };
      state.previousCard = { id: null, index: null };
      state.flippedCards = [];
      state.startTime = "";
      state.cardFlipCount = 0;
    },
    setImageList: (state, action) => {
      state.imageList = action.payload;
    },
    setPopUp: (state) => {
      state.popUp = !state.popUp;
    },
    setBoardDimensions: (state, action) => {
      state.boardDimensions = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setCardFlipCount: (state) => {
      state.cardFlipCount = state.cardFlipCount + 1;
    },
  },
});

export const {
  setCurrentCard,
  setPreviousCard,
  setSecondClick,
  setFlippedCards,
  setStateToInitialState,
  setImageList,
  setPopUp,
  setBoardDimensions,
  setStartTime,
  setCardFlipCount,
} = cardFlipperSlice.actions;

export default cardFlipperSlice.reducer;
