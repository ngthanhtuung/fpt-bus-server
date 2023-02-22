const signin = require("./signin.docs");
const getUsers = require("./getUsers.docs");
const uploadFile = require("./uploadFile.docs");
const pushNotification = require("./pushNotification.docs");
const getAllBus = require("./getAllBus.docs");
const createBus = require("./createBus.docs");
const updateBus = require("./updateBus.docs");

module.exports = {
  paths: {
    //Authentication API
    "/api/v1/auth/sign-in": {
      ...signin,
    },

    //User API
    "/api/v1/users/:key": {
      ...getUsers,
    },
    //Upload File
    "/api/v1/upload-file": {
      ...uploadFile,
    },

    //Notification API
    "/api/v1/notification": {
      ...pushNotification,
    },

    //Bus API
    "/api/v1/bus": {
      ...getAllBus,
    },
    "/api/v1/bus/create": {
      ...createBus,
    },
    "/api/v1/bus/update/:id": {
      ...updateBus,
    },
  },
};
