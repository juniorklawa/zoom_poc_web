import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import meetConfig from "../../config/meetingConfig";
import "./styles.css";

const Zoom = () => {
  const { meetingNumber, password } = useParams();

  const joinMeeting = useCallback(
    (signature) => {
      //we need to import websdk this way because of "black screen issue" see more here:
      //https://devforum.zoom.us/t/i-get-a-black-screen-when-just-importing-zoommtg-from-zoomus-websdk/38663

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
    ZoomMtg.generateSignature({
      meetingNumber: meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: function (res) {
        setTimeout(() => {
          joinMeeting(res.result);
        }, 1000);
      },
    });

    // USE THIS METHOD IF YOU ARE GENERATING YOUR SIGNATURE IN BACKEND
    // const fetchData = async () => {
    //   try {
    //     const { data } = await axios.post(meetConfig.signatureEndPoint, {
    //       meetingId: meetingNumber,
    //       role: meetConfig.role,
    //     });
    //     joinMeeting(data.signature);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchData();
  }, [joinMeeting, meetingNumber]);

  return <> </>;
};

export default Zoom;
