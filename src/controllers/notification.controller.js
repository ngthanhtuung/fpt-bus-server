const admin = require("firebase-admin");
const fcm = require("fcm-notification");
const serviceAccount = require("../config/firebase-notification");

const certPath = admin.credential.cert(serviceAccount);
const FCM = new fcm(certPath);

const pushNotiByTopic = async (topic, title, content) => {
  try {
    const message = {
      notification: {
        title: title,
        body: content,
      },
      topic: topic,
    };
    FCM.getMessaging().send(message)
    // FCM.send(message, (err, response) => {
    //   if (err) {
    //     return false;
    //   } else {
    //     console.log("Noti mess: ", response)
    //     return true;
    //   }
    // });
  } catch (err) {
    return false;
  }
}

const pushNoti = async (req, res) => {
  const { title, content, token, topic } = req.body;

  if (!token) {
    res.status(404).json({
      status: "Fail",
      message: "Token device not found!",
    });
  } else {
    const message = {
      notification: {
        title: title,
        body: content,
      },
      token: token,
    };

    FCM.send(message, (err, response) => {
      if (err) {
        return res.status(500).json({
          status: "Fail",
          message: err.message,
        });
      } else {
        return res.status(200).json({
          status: "Success",
          message: "Notification sent successfully!",
        });
      }
    });
  }
};

module.exports = {
  pushNoti,
  pushNotiByTopic
};
