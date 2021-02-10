<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
* [Installation](#installation)

<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
```sh
git clone https://github.com/juniorklawa/zoom_poc_web.git
```
3. Install packages
```sh
yarn or npm install
```
4. Enter your configs in `src/config/meetingConfig.js`
```JS
  meetingNumber: "YOUR_MEETING_NUMBER" //fill in if you don't want to fill in by input
  password: "YOUR_MEETING_PASSWORD", //fill in if you don't want to fill in by input
  role: 0, // 0 for participant 1 to enter as a host 5 to enter in meeting control mode
  userEmail: "YOUR_USER_EMAIL", // must be the attendee email address
  userName: "YOUR_USER_NAME,
  apiKey: "YOUR_API_KEY", // your Zoom api key (JWT)
  apiSecret: "YOUR_API_KEY", // You should only put a value here if your signature is being generated on the Frontend (not recommended)
  signatureEndPoint: "YOUR_SIGNATURE_ENDPOINT" //, 
```
5. Choose how you will generate the signature and enter the meeting in the `src/pages/Zoom/index.js` file

Uncomment this block of code if you are generating your signature in frontend
```JS
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
```

Uncomment this block of code if you are generating your signature in your backend (Recommended)
```JS
    const fetchData = async () => {
      try {
        const { data } = await axios.post(meetConfig.signatureEndPoint, {
        meetingId: meetingNumber,
          role: meetConfig.role,
        });
        joinMeeting(data.signature);
       } catch (error) {
       console.log(error);
        }
     };
     fetchData();
```



3. Run
```sh
yarn start
```

<p align="center">
  <img src="https://i.imgur.com/S4BUqd8.png"  height="320">
  <img src="https://i.imgur.com/K2VDJlb.png"  height="320">
</p>




