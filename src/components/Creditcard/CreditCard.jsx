/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import styles from "./CreditCard.module.css"; // Import CSS module

const CreditCard = ({ card, cardId }) => {
  return (
    <Link to={`/card/${cardId}`} state={card}>
      <div
        className={styles.cardPreview}
        style={{ background: card.cardBg || "#f0f0f0" }}
      >
        <div className={styles.vendor}>
          <img src={card.vendorLogo} alt="Logo" className={styles.bankLogo} />
          <p>{card.vendor}</p>
        </div>
        <p>{card.cardNumber}</p>
        <div className={styles.cardholder}>
          <p>{card.name}</p>
          <p>{card.validDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default CreditCard;
