const signin = require("./Auth/signin.docs");
const getUsers = require("./Users/getUsers.docs");
const uploadFile = require("./Firebase/uploadFile.docs");
const pushNotification = require("./Firebase/pushNotification.docs");
const getAllBus = require("./Bus/getAllBus.docs");
const getABus = require("./Bus/getABus.docs");
const createBus = require("./Bus/createBus.docs");
const updateBus = require("./Bus/updateBus.docs");
const changeStatus = require("./Bus/changeStatus.docs");

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
    // //Bus API
    "/api/v1/bus": {
      ...getAllBus,
    },
    "/api/v1/bus/:id": {
      ...getABus,
    },
    "/api/v1/bus/create": {
      ...createBus,
    },
    "/api/v1/bus/update/:id": {
      ...updateBus,
    },
    "/api/v1/bus/change-status/:id": {
      ...changeStatus,
    },
  },
};
