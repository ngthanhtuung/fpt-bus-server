const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadString,
  getDownloadURL
} = require("firebase/storage");
const moment = require("moment-timezone");
const firebaseConfig = require("../config/firebase.config");
initializeApp(firebaseConfig);

const uploadQRCode = async (data, ticketId) => {
  try {
    const storage = getStorage();
    let storageRef, urlImage;
    const timeNow = moment.tz().format();
    storageRef = ref(storage, `qr-code/qr-code-${timeNow}-${ticketId}`);
    const uploadBase64 = await uploadString(
      storageRef,
      data,
      "data_url"
    );
    // get url image
    urlImage = await getDownloadURL(storageRef);
    console.log("urlImage: ", urlImage);
    return urlImage;
  } catch (err) {
    return null;
  }
}

const uploadFile = async (req, res) => {
  try {
    // get image from body
    const { type, imageBase64, userId } = req.body;
    //check input param
    if (type === undefined || imageBase64 === undefined) {
      return res.status(400).json({
        status: "Fail",
        messages: "Missing param!!!"
      });
    }
    //get storage in fire base
    const storage = getStorage();
    let storageRef, urlImage;
    const timeNow = moment.tz().format();
    //type: profile, qrCode
    switch (type) {
      case "profile":
        //reference to bucket and folder
        storageRef = ref(storage, `profile/profile-user-${timeNow}-${userId}`);
        break;
      case "qrCode":
        //reference to bucket and folder
        storageRef = ref(storage, `qr-code/qr-code-${timeNow}-${userId}`);
        break;
    }
    //use uploadString method to upload image
    const uploadBase64 = await uploadString(
      storageRef,
      imageBase64,
      "data_url"
    );
    console.log(uploadBase64);
    // get url image 
    urlImage = await getDownloadURL(storageRef);
    console.log("urlImage: ", urlImage);
    res.status(200).json({
      status: "Success",
      messages: "Upload Successfully!!",
      data: {
        imageUrl: urlImage
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message
    });
  }
};

module.exports = {
  uploadFile,
  uploadQRCode
};
