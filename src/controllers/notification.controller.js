const firebaseConfig = require("../config/firebase.config");

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
    await firebase
      .messaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
          status: "Success",
          message: "Notification sent successfully!",
          response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "Fail",
          message: "Notification sent failed!",
          error,
        });
      });
  }
};

module.exports = {
  pushNoti,
};
