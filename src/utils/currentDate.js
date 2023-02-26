const currentDate = () => {
  const options = { timeZone: "Asia/Ho_Chi_Minh" };
  const vietnamTime = new Date().toLocaleString("en-US", options);
  const isoDate = new Date(vietnamTime);

  return isoDate.toISOString();
};
module.exports = currentDate;
