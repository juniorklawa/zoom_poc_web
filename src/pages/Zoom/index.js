import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { starWars, uniqueNamesGenerator } from "unique-names-generator";
import "./styles.css";

const config = {
  dictionaries: [starWars],
};

const signatureEndPoint =
  "https://3013f69ea98c.ngrok.io/zoom/meeting/signature";

const meetConfig = {
  apiKey: "T6eHyJQRSiujIDALYMIshA", // your Zoom api key (JWT)
  apiSecret: "", // fill this if you are generating your api secret in frontend
  meetingNumber: "95850490601",
  userName: uniqueNamesGenerator(config), //feel free to change this :)
  userEmail: "example@example.com", // must be the attendee email address
  password: "Senha123",
  role: 1, // 0 for participant 1 to enter as a host 5 to enter in meeting control mode
};

const Zoom = () => {
  const { meetingNumber, password } = useParams();

  const joinMeeting = useCallback(
    (signature) => {
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
            userEmail: meetConfig.userEmail,
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
      });
    },
    [meetingNumber, password]
  );

  useEffect(() => {
    //we need to import websdk this way because of "black screen issue" see more here:
    //https://devforum.zoom.us/t/i-get-a-black-screen-when-just-importing-zoommtg-from-zoomus-websdk/38663
    
    const { ZoomMtg } = require("@zoomus/websdk");

    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    // USE THIS METHOD IF YOU ARE GENERATING YOUR SIGNATURE IN FRONTEND (NOT RECOMMENDED TO PROD)
    // ZoomMtg.generateSignature({
    //   meetingNumber: meetingNumber,
    //   apiKey: process.env.REACT_APP_ZOOM_API_KEY,
    //   apiSecret: process.env.REACT_APP_ZOOM_API_SECRET_KEY,
    //   role: meetConfig.role,
    //   success: function (res) {
    //     setTimeout(() => {
    //       joinMeeting(res.result, meetConfig);
    //     }, 1000);
    //   },
    // });

    // USE THIS METHOD IF YOU ARE GENERATING YOUR SIGNATURE IN BACKEND

    fetch(signatureEndPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingId: meetingNumber,
        role: meetConfig.role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        joinMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [joinMeeting, meetingNumber]);

  return <div className="App">Zoom Testing</div>;
};

export default Zoom;
