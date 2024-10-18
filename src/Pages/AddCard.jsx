// src/components/AddCard.js

import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardsSlice";
import { useState, useEffect } from "react";
import { checkVendor } from "../utils/vendorUtils";
import CardCredit from "../components/CardCredit/CardCredit";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";

const AddCard = () => {
  // State for form inputs
  const [vendor, setVendor] = useState("");
  const [vendorLogo, setVendorLogo] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [validDate, setValidDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardBg, setCardBg] = useState(null);
  const [date, setDate] = useState(null);

  // Validation checker
  const [isValid, setIsValid] = useState(true);

  const [newCard, setNewCard] = useState({});
  const cards = useSelector((store) => store.cards.cardsArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update newCard state
  useEffect(() => {
    setNewCard({
      vendor,
      vendorLogo,
      cardNumber,
      name,
      validDate,
      cvc,
      cardBg,
      active: date && date >= new Date(),
      uniqueId: Math.floor(Math.random() * 9999) + 1,
    });
  }, [vendor, vendorLogo, cardNumber, name, validDate, cvc, cardBg, date]);

  // Update the checkVendor function to accept the selected value
  const handleVendorChange = (e) => {
    checkVendor(e.target.value, setVendorLogo, setVendor, setCardBg);
  };

  // Function to handle adding the card
  const checkNewCard = () => {
    if (cards.length <= 3) {
      if (vendor && cardNumber && name && validDate && cvc) {
        dispatch(addCard(newCard));
        navigate("/");
      } else {
        alert("Please fill out all fields.");
      }
    } else {
      alert("Too many cards");
    }
  };

  return (
    <>
      <div className="addCardContainer">
        <BackButton />

        <h2>Add new Card</h2>
        <div className="preview">
          <CardCredit card={newCard} cardId={null} />
        </div>

        <select name="vendorChoice" onChange={handleVendorChange}>
          <option value="">Card vendor</option>
          <option value="1">Summit Trust Bank</option>
          <option value="2">Aspire Financial</option>
          <option value="3">Titanium National Bank</option>
        </select>

        <input
          type="text"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value;

            const isValidInput = /^[0-9]*$/.test(value);

            if (isValidInput && value.length <= 16) {
              setCardNumber(value);
              setIsValid(value.length === 16);
            }
          }}
          style={{
            border: isValid ? "1px solid black" : "2px solid red",
          }}
        />
        <input
          type="text"
          placeholder="Card Holder"
          value={name}
          onChange={(e) => {
            const value = e.target.value;

            const isValid = /^[A-Za-z ]*$/.test(value);

            if (isValid) {
              setName(value);
            }
          }}
          style={{
            border: /^[A-Za-z ]*$/.test(name)
              ? "1px solid black"
              : "1px solid red", // Apply red border if invalid
          }}
        />
        <div className="datePick">
          <input
            type="date"
            placeholder="Valid thru"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setDate(date);
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              setValidDate(`${month}/${year}`);
            }}
          />

          <input
            type="number"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d{0,3}$/.test(value)) {
                setCvc(value);
              }
            }}
            maxLength={3}
            style={{
              border: /^\d{3}$/.test(cvc) ? "1px solid black" : "1px solid red",
            }}
          />
        </div>

        <button className="primaryBtn" onClick={checkNewCard}>
          Add card!
        </button>
      </div>
    </>
  );
};

export default AddCard;
