const admin = require("firebase-admin");
const fcm = require("fcm-notification");
require('dotenv').config();
const serviceAccount = require("../config/firebase-notification");
const { v4: uuid } = require("uuid");
const { Notification } = require('../models');
const currentDate = require("../utils/currentDate");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
})

const certPath = admin.credential.cert(serviceAccount);
const FCM = new fcm(certPath);

const pushNotiByTopic = (topic, title, content) => {
  try {
    const message = {
      notification: {
        title: title,
        body: content,
      },
      topic: topic
    };
    admin.messaging().send(message).then((response) => {
      return true;
    }).catch((error) => {
      return false;
    });

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


const createNotiObject = (notification, listUserId) => {
  const notiObject = [];
  listUserId.forEach((userId) => {
    notiObject.push({
      id: uuid(),
      user_id: userId,
      title: notification.title,
      body: notification.body,
      sentTime: currentDate(),
      createdAt: currentDate(),
      updatedAt: currentDate(),
    });
  });
  return notiObject;
}


module.exports = {
  pushNoti,
  pushNotiByTopic,
  createNotiObject
};
