const moment = require("moment-timezone");

const currentDate = () => {
  const now = moment.tz("Asia/Ho_Chi_Minh");
  const current = now.format("YYYY-MM-DD HH:mm:ss");
  return current;
};
module.exports = currentDate;
