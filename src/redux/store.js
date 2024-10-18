import { configureStore } from "@reduxjs/toolkit";
import cards from "./cardsSlice";

export const store = configureStore({
  reducer: {
    cards,
  },
});
