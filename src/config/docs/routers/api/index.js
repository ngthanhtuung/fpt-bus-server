const signin = require("./signin.docs");
const getUsers = require("./getUsers.docs");
const uploadFile = require("./uploadFile.docs")
module.exports = {
  paths: {
    //Authentication API
    "/api/v1/auth/sign-in": {
      ...signin,
    },

    //User API
    "/api/v1/users": {
      ...getUsers,
    },
    //Upload File
    "/api/v1/upload-file": {
      ...uploadFile,
    },
  },
};
