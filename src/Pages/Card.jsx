import { useLocation, useNavigate } from "react-router-dom";
import CardCredit from "../components/CardCredit/CardCredit";
import { useDispatch } from "react-redux";
import { activateCard, changeCard, deleteCard } from "../redux/cardsSlice";
import { useEffect, useState } from "react";
import { checkVendor } from "../utils/vendorUtils";
import BackButton from "../components/BackButton/BackButton";

const Card = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state;
  const dispatch = useDispatch();

  // State for form inputs
  const [vendor, setVendor] = useState(card.vendor);
  const [vendorLogo, setVendorLogo] = useState(card.vendorLogo);
  const [cardNumber, setCardNumber] = useState(card.cardNumber);
  const [name, setName] = useState(card.name);
  const [date, setDate] = useState(card.date);
  const [active, setActive] = useState(card.active);
  const [validDate, setValidDate] = useState(card.validDate);
  const [cvc, setCvc] = useState(card.cvc);
  const [cardBg, setCardBg] = useState(card.cardBg);

  const [isValid, setIsValid] = useState(true);

  let isDisabled = card.active;

  const newCard = {
    vendor,
    vendorLogo,
    cardNumber,
    name,
    validDate,
    cvc,
    cardBg,
    active,
    uniqueId: card.uniqueId,
  };

  if (!card) {
    return <div>Card not found</div>;
  }

  const checkDelete = (card) => {
    dispatch(deleteCard(card.uniqueId));
    alert("Card has been deleted");
    navigate("/");
  };
  const checkChanges = (card) => {
    if (vendor && cardNumber && name && validDate && cvc) {
      dispatch(changeCard(card));
      navigate("/");
    } else {
      alert("Cant leave fields empty!");
    }
  };

  const handleVendorChange = (e) => {
    const selectedVendor = parseInt(e.target.value);

    checkVendor(selectedVendor, setVendorLogo, setVendor, setCardBg);
  };

  const checkActivation = () => {
    const [month, year] = validDate.split("/");

    const newYear = parseInt(year) + 1;

    const updatedValidDate = `${month}/${newYear}`;

    setValidDate(updatedValidDate);

    dispatch(
      activateCard({ uniqueId: card.uniqueId, newValidDate: updatedValidDate })
    );

    alert(`Card has been renewed! New expiry date: ${updatedValidDate}`);
    navigate("/");
  };

  return (
    <>
      <div className="cardDetails">
        <BackButton />
        <h2>Card Details</h2>
        <CardCredit card={newCard} />

        <select
          name="vendorChoice"
          onChange={handleVendorChange}
          className={isDisabled ? "disabled" : ""}
        >
          <option value="">Card vendor</option>
          <option value="1">Summit Trust Bank</option>
          <option value="2">Aspire Financial</option>
          <option value="3">Titanium National Bank</option>
        </select>

        <input
          type="text"
          placeholder="Card number"
          className={isDisabled ? "disabled" : ""}
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
          className={isDisabled ? "disabled" : ""}
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
            className={isDisabled ? "disabled" : ""}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setDate(date);
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              setValidDate(`${month}/${year}`);
              setActive(true);
            }}
          />

          <input
            type="number"
            placeholder="CVC"
            className={isDisabled ? "disabled" : ""}
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
        <button onClick={() => checkDelete(card)} className="primaryBtn delete">
          Delete Card
        </button>
        <button
          onClick={() => checkChanges(newCard)}
          className={` primaryBtn ${card.active ? "disabled" : ""}`}
        >
          Save Changes
        </button>
        {!card.active && (
          <button className="primaryBtn" onClick={() => checkActivation()}>
            Renew for 1 year!
          </button>
        )}
      </div>
    </>
  );
};

export default Card;
