/* eslint-disable react/prop-types */

import styles from "../Creditcard/CreditCard.module.css"; // Import CSS module

const CreditCard = ({ card }) => {
  return (
    <div
      className={styles.cardPreview}
      style={{ background: card.cardBg || "#f0f0f0" }}
    >
      <div className={styles.vendor}>
        {card.vendorLogo && (
          <img src={card.vendorLogo} alt="Logo" className={styles.bankLogo} />
        )}
        <p>{card.vendor}</p>
      </div>
      <p>{card.cardNumber}</p>
      <div className={styles.cardholder}>
        <p>{card.name}</p>
        <p>{card.validDate}</p>
      </div>
    </div>
  );
};

export default CreditCard;
