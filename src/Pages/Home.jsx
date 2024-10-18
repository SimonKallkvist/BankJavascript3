import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CreditCard from "../components/Creditcard/CreditCard";
import { deleteAllCards, deleteCard } from "../redux/cardsSlice";

const Home = () => {
  const cards = useSelector((store) => store.cards.cardsArray);
  console.log(cards);
  const dispatch = useDispatch();

  return (
    <>
      <div className="homeCards">
        <h2>Active Cards</h2>
        <div className="cardsContainer">
          {cards.map((card, i) =>
            card.active ? (
              <div key={i} className="card">
                <CreditCard cardId={card.uniqueId} card={card} />
              </div>
            ) : null
          )}
        </div>

        <h2>Inactive Cards</h2>
        <div className="cardsContainer">
          {cards.map((card, i) =>
            !card.active ? (
              <div key={i} className="inactive">
                <CreditCard cardId={card.uniqueId} card={card} />
                <button
                  className="primaryBtn delete"
                  onClick={() => dispatch(deleteCard(card.uniqueId))}
                >
                  Delete
                </button>
              </div>
            ) : null
          )}
        </div>

        <Link to={"/addcard"}>
          <button className="primaryBtn">Add a card</button>
        </Link>
        {cards.length > 0 && cards.some((card) => !card.active) && (
          <button
            className="primaryBtn"
            onClick={() => dispatch(deleteAllCards())}
          >
            Delete all inactive cards
          </button>
        )}
        <Link to={"/settings"}>
          <button className="primaryBtn">Settings</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
