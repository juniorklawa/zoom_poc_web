import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const [meetingNumber, setMeetingNumber] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  return (
    <div id="container">
      <h1>ZOOM SDK EXAMPLE</h1>

      <h3>MEETING ID</h3>

      <input
        type="text"
        value={meetingNumber}
        onChange={(event) => setMeetingNumber(event.target.value)}
      />

      <h3>PASSWORD</h3>

      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div
        id="start-meeting"
        onClick={() => {
          history.push(`/zoom/${meetingNumber}/${password}`);
        }}
      >
        Iniciar
      </div>
    </div>
  );
};

export default Home;
