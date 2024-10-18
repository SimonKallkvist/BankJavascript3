import { useNavigate } from "react-router-dom";

import style from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  let back = "<<<";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className={style.backButton}>
      {back}
    </button>
  );
};

export default BackButton;
