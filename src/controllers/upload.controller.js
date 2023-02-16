const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadString } = require('firebase/storage');
const moment = require('moment-timezone');
const firebaseConfig = require('../config/firebase.config');
initializeApp(firebaseConfig);
const uploadFile = async (req, res) => {
    try {
        // get image from body
        const { type, imageBase64 } = req.body
        //get storage in fire base
        const storage = getStorage()
        let storageRef;
        const timeNow = moment.tz().format()
        switch (type) {
            case "profile":
                //reference to bucket and folder
                storageRef = ref(storage, `profile/profile-user-${timeNow}`)
                break;
            case "qrCode":
                storageRef = ref(storage, `qr-code/qr-code-${timeNow}`)
                break;
        }
        //use uploadString method to upload image
        // const uploadBase64 = await uploadFile(storageRef, message4, 'data_url').promise()
        uploadString(storageRef, imageBase64, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
        });
        res.status(200).json({
            status: "Success",
            messages: "Upload Successfully!!",
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    uploadFile,
};
