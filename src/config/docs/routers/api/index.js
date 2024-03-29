const signin = require("./Auth/signin.docs");
const signinPhone = require('./Auth/signinPhone.docs');
const verifyOTP = require('./Auth/verifyOTP.docs');
const getUsers = require("./Users/getUsers.docs");
const getWallet = require("./Users/getWallet.docs");
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
const getRouteById = require("./Route/getRouteById.docs");
const createRoute = require("./Route/createRoute.docs");
const changeStatusRoute = require("./Route/changeStatusRoute.docs");
const countRouteOfStation = require("./Route/countRouteOfStation.docs");
const updateRoute = require("./Route/updateRoute.docs");
const getAllTrip = require("./Trip/getAllTrip.docs");
const getTripById = require("./Trip/getTripById.docs");
const getTodayTrip = require("./Trip/getTodayTrip.docs");
const createTrip = require("./Trip/createTrip.docs");
const updateTrip = require("./Trip/updateTrip.docs");
const changeTripStatus = require("./Trip/changeTripStatus.docs");
const getAllTicket = require('./Ticket/getAllTicket.docs');
const getTicketById = require('./Ticket/getTicketById.docs');
const tripComing = require('./Ticket/tripComing.docs');
const bookingTicket = require("./Ticket/bookingTicket.docs");
const cancelTicket = require("./Ticket/cancelTicket.docs");
const checkinTicket = require("./Ticket/checkinTicket.docs");
const payTopUp = require("./Payment/payTopUp.docs");
const getAllTransaction = require("./Payment/getAllTransaction.docs");
const getAllNotification = require('./Notification/getAllNotification.docs');
const createNotification = require('./Notification/createNotification.docs');

module.exports = {
  paths: {
    //Authentication API
    "/api/v1/auth/sign-in": {
      ...signin
    },
    "/api/v1/auth/phone/sign-in": {
      ...signinPhone
    },
    "/api/v1/auth/verify-otp": {
      ...verifyOTP
    },

    //User API
    "/api/v1/user": {
      ...getUsers
    },
    "/api/v1/user/wallet": {
      ...getWallet
    },
    "/api/v1/user/create": {
      ...createUser
    },
    "/api/v1/user/update/{userId}": {
      ...updateUser
    },
    "/api/v1/user/change-status/{id}": {
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
    "/api/v1/route/{routeId}": {
      ...getRouteById
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
    "/api/v1/route/total/distances/{idRoute}": {
      ...countRouteOfStation
    },

    //Trip API
    "/api/v1/trip": {
      ...getAllTrip
    },
    "/api/v1/trip/search/{tripId}": {
      ...getTripById
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
    "/api/v1/ticket": {
      ...getAllTicket
    },
    "/api/v1/ticket/coming": {
      ...tripComing
    },
    "/api/v1/ticket/{ticketId}": {
      ...getTicketById
    },
    "/api/v1/ticket/booking": {
      ...bookingTicket
    },
    "/api/v1/ticket/cancel/{ticketId}": {
      ...cancelTicket
    },
    "/api/v1/ticket/check-in/{idTicket}": {
      ...checkinTicket
    },

    //Payment API
    "/api/v1/payment/top-up": {
      ...payTopUp
    },
    "/api/v1/payment/transaction": {
      ...getAllTransaction
    },

    //Notification API
    "/api/v1/notification/all": {
      ...getAllNotification
    },
    "/api/v1/notification/create": {
      ...createNotification
    }
  }
};
