import { starWars, uniqueNamesGenerator } from "unique-names-generator";

const config = {
  dictionaries: [starWars],
};

const meetConfig = {
  meetingNumber: "",
  password: "",
  role: 0, // 0 for participant 1 to enter as a host 5 to enter in meeting control mode
  userEmail: "", // must be the attendee email address
  userName: uniqueNamesGenerator(config), //feel free to change this :)
  apiKey: "", // your Zoom api key (JWT)
  apiSecret: "", // fill this if you are generating your api secret (JWT) in frontend 
  signatureEndPoint: "", //end point where we generate the signature
  // see more here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/signature
};

export default meetConfig;
