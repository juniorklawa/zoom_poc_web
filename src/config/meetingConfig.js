import { starWars, uniqueNamesGenerator } from "unique-names-generator";

const config = {
  dictionaries: [starWars],
};

const meetConfig = {
  meetingNumber: "",
  password: "",
  role: 1, // 0 for participant 1 to enter as a host 5 to enter in meeting control mode
  userEmail: "example@example.com", // must be the attendee email address
  userName: uniqueNamesGenerator(config), //feel free to change this :)
  apiKey: "-h74ZzBrRTqEJsf9p3pgFg", // your Zoom api key (JWT)
  apiSecret: "0Q8VYU50BYKQEn3scNasCHeA7Xp4Y6vjEJjQ", // fill this if you are generating your api secret (JWT) in frontend 
  signatureEndPoint: "https://3013f69ea98c.ngrok.io/zoom/meeting/signature", //end point where we generate the signature
  // see more here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/signature
};

export default meetConfig;
