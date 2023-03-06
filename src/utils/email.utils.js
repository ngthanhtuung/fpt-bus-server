const getStudentId = (email) => {
  const studentId = email
    .substring(0, email.indexOf("@"))
    .slice(-8)
    .toUpperCase();
  return studentId;
};

const checkStudentId = (studentId) => {
  const regex = /^(SE|SA|SS)(1[4-9]|[2-9]\d)\d{4}$/;
  return regex.test(studentId);
};

const checkEmailDomain = (email, listDomain) => {
  const domain = email.substring(email.lastIndexOf("@") + 1);
  return listDomain.includes(domain);
};

module.exports = {
  getStudentId,
  checkEmailDomain,
};
