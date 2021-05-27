// Params for login
let options = {
  uid: "",
  token: "",
};

// Your app ID
const appID = "6714b60932fb4ace8abedfb32cbf2bd0";
// Your token
options.token = "";

const clientRTM = AgoraRTM.createInstance(appID);

clientRTM.on("MessageFromPeer", function (message, peerId) {
  console.log("Message from: " + peerId + " Message: " + message);
  console.log(message);;
  if (message.text == "mute") {
    var localStream = AgoraRTC.createStream({
      streamID: 12345,
      audio: true,
      video: true,
      screen: false,
    });
    toggleBtn($("#mic-btn"));
    $("#mic-icon")
      .toggleClass("fa-microphone")
      .toggleClass("fa-microphone-slash"); // toggle the mic icon
    if ($("#mic-icon").hasClass("fa-microphone")) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
  } else if (message.text == "video") {
    var localStream = AgoraRTC.createStream({
      streamID: 12345,
      audio: true,
      video: true,
      screen: false,
    });
    toggleBtn($("#video-btn")); // toggle button colors
    $("#video-icon").toggleClass("fa-video").toggleClass("fa-video-slash"); // toggle the video icon
    if ($("#video-icon").hasClass("fa-video")) {
      localStream.unmuteVideo(); // enable the local video
      toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
    } else {
      localStream.muteVideo(); // disable the local video
      toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
    }
  }
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
  const res = await fetch(`https://shruti3004-agora-token-service-backend.zeet.app/rtm/${uid}`);
  const data = await res.json();
  options.token = data.rtmToken;
  console.log(uid);
  options.uid = uid.toString();
  await clientRTM.login(options);
  console.log("Client LOG IN with this ID");
  await channel.join().then(() => {
    console.log("You have successfully joined channel " + channel.channelId);
  });
}

async function sendMessage(peerMessage, peerId) {
  await clientRTM
    .sendMessageToPeer({ text: peerMessage }, "12345")
    .then((sendResult) => {
      console.log(sendResult);
      if (sendResult.hasPeerReceived) {
        console.log(
          `Message has been received by: ${peerId} and Message is ${peerMessage}`
        );
      } else {
        console.log(`Message sent to 12345`);
      }
    });  
}
