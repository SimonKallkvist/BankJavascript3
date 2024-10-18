import { createSlice } from "@reduxjs/toolkit";
import Summit from "../assets/SummitLogo.png";

const initialCard = {
  vendor: "Summit Trust Bank",
  vendorLogo: Summit,
  cardNumber: "1234567890",
  name: "Test Testson",
  validDate: "10/29",
  cvc: 123,
  cardBg:
    "linear-gradient(130deg, rgba(31,58,147,1) 0%, rgba(229,229,229,1) 64%, rgba(0,174,239,1) 100%)",
  active: false,
  uniqueId: 123456789,
};

const cards = createSlice({
  name: "Cards",
  initialState: {
    cardsArray: [initialCard],
  },
  reducers: {
    addCard: (state, action) => {
      state.cardsArray.push(action.payload);
    },
    deleteCard: (state, action) => {
      const cardIdToDelete = action.payload;
      state.cardsArray = state.cardsArray.filter(
        (card) => card.uniqueId !== cardIdToDelete
      );
      console.log("Card has been deleted");
    },
    changeCard: (state, action) => {
      const existingCard = state.cardsArray.find(
        (card) => card.uniqueId === action.payload.uniqueId
      );

      if (existingCard) {
        state.cardsArray = state.cardsArray.map((card) =>
          card.uniqueId === existingCard.uniqueId ? action.payload : card
        );
        console.log("Card has been altered");
      } else {
        console.log("No matching card found to update");
      }
    },
    activateCard: (state, action) => {
      const { uniqueId, newValidDate } = action.payload;
      const cardToActivate = state.cardsArray.find(
        (card) => card.uniqueId === uniqueId
      );

      if (cardToActivate) {
        cardToActivate.validDate = newValidDate;
        cardToActivate.active = true;

        console.log("Card has been activated");
      }
    },
    deleteAllCards: (state, action) => {
      state.cardsArray = state.cardsArray.filter(
        (card) => card.active === true
      );
      console.log("All inactive cards have been deleted");
    },
  },
});

export const { addCard, deleteCard, changeCard, activateCard, deleteAllCards } =
  cards.actions;
export default cards.reducer;
