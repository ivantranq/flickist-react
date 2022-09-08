import React from "react";
import "./Popup.css";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ trigger, setTrigger }) => {
  return trigger === true ? (
    <div className="popup">
      <div className="popup__container">
        <CloseIcon onClick={() => setTrigger(false)}></CloseIcon>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;
