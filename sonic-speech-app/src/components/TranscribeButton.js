import React from "react";
import "../styles/TranscribeButton.css";
const TranscribeButton = (props) => {
  return (
    <button className="transcribe-button" onClick={props.onClick}>
      Transcribe file
    </button>
  );
};

export default TranscribeButton;
