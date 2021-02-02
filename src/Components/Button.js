import React from "react";
import "./Button.css";
import { useHistory } from "react-router-dom";
function Button({ meetingNumber, password }) {
  const history = useHistory();

  return (
    <div
      className="button"
      onClick={() => {
        history.push(`/zoom/${meetingNumber}/${password}`);
      }}
      style={{
        width: 250,
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <h1 style={{ fontSize: 18 }}> Iniciar </h1>
    </div>
  );
}

export default Button;
