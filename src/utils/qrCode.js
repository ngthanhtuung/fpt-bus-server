const QRCode = require("qrcode");

const generateQRCode = async (data) => {
    try {
        const base64 = await QRCode.toDataURL(data);
        return base64;
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateQRCode
}
