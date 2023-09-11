import { configureStore } from "@reduxjs/toolkit";
import cardFlipSlice from "../reducer/cardFlipSlice.js";

export default configureStore({
  reducer: { cardFlipper: cardFlipSlice },
});
