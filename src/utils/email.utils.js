const getStudentId = (email) => {
  const studentId = email
    .substring(0, email.indexOf("@"))
    .slice(-8)
    .toUpperCase();
  return studentId;
};

module.exports = {
  getStudentId,
};
