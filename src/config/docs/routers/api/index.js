const signin = require("./Auth/signin.docs");
const getUsers = require("./Users/getUsers.docs");
const createUser = require("./Users/createUser.docs");
const updateUser = require("./Users/updateUser.docs");
const changeStatusUser = require("./Users/changeStatusUser.docs");
const uploadFile = require("./Firebase/uploadFile.docs");
const pushNotification = require("./Firebase/pushNotification.docs");
const getAllBus = require("./Bus/getAllBus.docs");
const createBus = require("./Bus/createBus.docs");
const updateBus = require("./Bus/updateBus.docs");
const changeStatus = require("./Bus/changeStatus.docs");
const getAllStation = require("./Station/getAllStation.docs");
const createStation = require("./Station/createStation.docs");
const updateStation = require("./Station/updateStation.docs");
const changeStatusStation = require("./Station/changeStatusStation.docs");
const getAllRoute = require("./Route/getAllRoute.docs");
const createRoute = require("./Route/createRoute.docs");
const changeStatusRoute = require("./Route/changeStatusRoute.docs");
const updateRoute = require("./Route/updateRoute.docs");
const getAllTrip = require("./Trip/getAllTrip.docs");
const getTodayTrip = require("./Trip/getTodayTrip.docs");
const createTrip = require("./Trip/createTrip.docs");
const updateTrip = require("./Trip/updateTrip.docs");
const changeTripStatus = require("./Trip/changeTripStatus.docs");
const bookingTicket = require("./Ticket/bookingTicket.docs");
const checkinTicket = require("./Ticket/checkinTicket.docs");

module.exports = {
  paths: {
    //Authentication API
    "/api/v1/auth/sign-in": {
      ...signin
    },

    //User API
    "/api/v1/users": {
      ...getUsers
    },
    "/api/v1/users/create": {
      ...createUser
    },
    "/api/v1/users/change-status/{id}": {
      ...changeStatusUser
    },

    //Upload File
    "/api/v1/upload-file": {
      ...uploadFile
    },

    //Notification API
    "/api/v1/notification": {
      ...pushNotification
    },

    //Bus API
    "/api/v1/bus": {
      ...getAllBus
    },
    "/api/v1/bus/create": {
      ...createBus
    },
    "/api/v1/bus/update/{id}": {
      ...updateBus
    },
    "/api/v1/bus/change-status/{id}": {
      ...changeStatus
    },

    //Station API
    "/api/v1/station": {
      ...getAllStation
    },
    "/api/v1/station/create": {
      ...createStation
    },
    "/api/v1/station/update/{id}": {
      ...updateStation
    },
    "/api/v1/station/change-status/{id}": {
      ...changeStatusStation
    },

    //Route API
    "/api/v1/route": {
      ...getAllRoute
    },
    "/api/v1/route/create": {
      ...createRoute
    },
    "/api/v1/route/update/{id}": {
      ...updateRoute
    },
    "/api/v1/route/change-status/{id}": {
      ...changeStatusRoute
    },

    //Trip API
    "/api/v1/trip": {
      ...getAllTrip
    },
    "/api/v1/trip/{key}": {
      ...getTodayTrip
    },
    "/api/v1/trip/create": {
      ...createTrip
    },
    "/api/v1/trip/update/{id}": {
      ...updateTrip
    },
    "/api/v1/trip/change-status/{id}": {
      ...changeTripStatus
    },

    //Ticket API
    "/api/v1/ticket/booking": {
      ...bookingTicket
    },
    "/api/v1/ticket/check-in/{idTicket}": {
      ...checkinTicket
    }
  }
};
