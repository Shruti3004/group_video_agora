// Params for login
let options = {
  uid: "",
  token: "",
};

// Your app ID
const appID = "6714b60932fb4ace8abedfb32cbf2bd0";
// Your token
options.token =
  "0066714b60932fb4ace8abedfb32cbf2bd0IADgTii90Hi+tvfL7w0U7ZVafzO/CQZaIJTmox/MH2lc56Pg45sAAAAAEABVJf4HT/SpYAEA6ANP9Klg";

const clientRTM = AgoraRTM.createInstance(appID);

clientRTM.on("MessageFromPeer", function (message, peerId) {
  console.log("Message from: " + peerId + " Message: " + message);
});
// Display connection state changes
clientRTM.on("ConnectionStateChanged", function (state, reason) {
  console.log("State changed To: " + state + " Reason: " + reason);
});

let channel = clientRTM.createChannel("testing");

channel.on("ChannelMessage", function (message, memberId) {
  console.log("Message received from: " + memberId + " Message: " + message);
});
// Display channel member stats
channel.on("MemberJoined", function (memberId) {
  console.log(memberId + " joined the channel");
});
// Display channel member stats
channel.on("MemberLeft", function (memberId) {
  console.log(memberId + " left the channel");
});

async function joinRTMChannel(uid) {
  options.uid = uid.toString();
  console.log(clientRTM);
  console.log(options);
  await clientRTM.login(options);
  console.log("Client LOG IN with this ID");
  await channel.join().then(() => {
    console.log("You have successfully joined channel " + channel.channelId);
  });
}

async function sendMessage(peerMessage, peerId) {
  await clientRTM
    .sendMessageToPeer({ text: peerMessage }, peerId)
    .then((sendResult) => {
      if (sendResult.hasPeerReceived) {
        console.log(
          `Message has been received by: ${peerId} and Message is ${peerMessage}`
        );
      } else {
        console.log(`Message sent to ${peerId}`);
      }
    });
}
