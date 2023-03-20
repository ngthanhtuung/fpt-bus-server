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
      dataTitle: notification.dataTitle,
      dataBody: notification.dataBody,
      sentTime: currentDate(),
      createdAt: currentDate(),
      updatedAt: currentDate(),
    });
  });
  return notiObject;
}

const getAllNotification = async (req, res) => {
  try {
    const userLoginId = req.user_id;
    const notifications = await Notification.findAll({
      attributes: ['id', 'title', 'body', 'dataTitle', 'dataBody', 'sentTime', 'createdAt', 'updatedAt'],
      where: {
        user_id: userLoginId
      },
      order: [
        ['sentTime', 'DESC']
      ]
    });
    if (notifications == undefined) {
      res.status(404).json({
        status: "Fail",
        message: "Notification not found!",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Get notification successfully!",
        data: notifications,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    })
  }
}

const createNoti = async (req, res) => {
  try {
    const { title, body, dataTitle, dataBody, sentTime, userId } = req.body;
    const notification = await Notification.create({
      id: uuid(),
      user_id: userId,
      title: title,
      body: body,
      dataTitle: dataTitle,
      dataBody: dataBody,
      sentTime: sentTime,
      createdAt: currentDate(),
      updatedAt: currentDate(),
    })
    if (notification) {
      res.status(201).json({
        status: "Success",
        message: "Create notification successfully!",
        data: notification,
      });
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Create notification failed!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    })
  }
}


module.exports = {
  pushNoti,
  pushNotiByTopic,
  createNotiObject,
  createNoti,
  getAllNotification
};
