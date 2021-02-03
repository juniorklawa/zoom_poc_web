import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Button from "./Components/Button";
let apiKeys = {
  apiKey: process.env.REACT_APP_ZOOM_API_KEY,
  apiSecret: process.env.REACT_APP_ZOOM_API_SECRET_KEY,
};
let meetConfig = {
  apiKey: apiKeys.apiKey,
  meetingNumber: "77870605419",
  userName: "Usuário",
  userEmail: "example@example.com", // must be the attendee email address
  passWord: "0hZeCd",
  role: 0,
};

export default function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/zoom/:meetingNumber/:password">
            <Zoom />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

function Home() {
  const [meetingNumber, setMeetingNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#edf0f0" }}>POC ZOOM</h1>

      <h3 style={{ color: "#edf0f0" }}>ID da Reunião (sem espaços)</h3>

      <input
        style={{
          marginBottom: 32,
          borderRadius: 10,
          height: 50,
          width: 250,
          borderWidth: 0,
        }}
        type="text"
        value={meetingNumber}
        onChange={(event) => setMeetingNumber(event.target.value)}
      />

      <h3 style={{ color: "#edf0f0" }}>Senha</h3>

      <input
        style={{
          marginBottom: 32,
          borderRadius: 10,
          height: 50,
          width: 250,
          borderWidth: 0,
        }}
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button meetingNumber={meetingNumber} password={password} />
    </div>
  );
}

function Zoom() {
  const { meetingNumber, password } = useParams();

  function joinMeeting(signature, meetConfig) {
    const { ZoomMtg } = require("@zoomus/websdk");

    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      isSupportAV: true,
      success: function (success) {
        console.log("Init Success ", success);
        ZoomMtg.join({
          meetingNumber: meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          passWord: password,

          success: (success) => {
            console.log(success);
          },

          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }
  useEffect(() => {
    const { ZoomMtg } = require("@zoomus/websdk");

    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    /**
     * You should not visible api secret key on frontend
     * Signature must be generated on server
     * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    ZoomMtg.generateSignature({
      meetingNumber: meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: apiKeys.apiSecret,
      role: meetConfig.role,
      success: function (res) {
        console.log("res", res);

        setTimeout(() => {
          joinMeeting(res.result, meetConfig);
        }, 1000);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="App">Zoom Testing</div>;
}

function Users() {
  return <h2>Users</h2>;
}
