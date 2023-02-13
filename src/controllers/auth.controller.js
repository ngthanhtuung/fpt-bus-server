const jwt = require("jsonwebtoken");
const { getStudentId } = require("../utils/email.utils");
const { Users, RoleTypes } = require("../models");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const signIn = async (req, res) => {
  try {
    const googlePayload = jwt.decode(
      req.body.accessToken,
      process.env.FIREBASE_SECRET
    );

    const userLogin = await Users.findOne({
      where: {
        email: googlePayload.email,
        status: true,
      },
      include: [
        {
          model: RoleTypes,
          attributes: ["role_name"],
        },
      ],
    });
    if (userLogin) {
      const payload = {
        id: userLogin.id,
        fullname: userLogin.fullname,
        email: userLogin.email,
        phone_number: userLogin.phone_number,
        student_id: userLogin.student_id,
        status: userLogin.status,
        role_name: userLogin.RoleType.role_name,
      };
      const accessToken = createAccessToken(payload);
      res.status(200).json({
        status: "Success",
        messages: "Login successfully!",
        data: {
          user: payload,
          accessToken,
        },
      });
    } else {
      signUp(req, res);
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const signUp = async (req, res) => {
  try {
    const googlePayload = jwt.decode(
      req.body.accessToken,
      process.env.FIREBASE_SECRET
    );

    const decodeUser = {
      id: uuidv4(),
      fullname: googlePayload.name,
      email: googlePayload.email,
      student_id: getStudentId(googlePayload.email),
      createdAt: new Date(),
      updartedAt: new Date(),
      status: true,
    };

    await Users.create(decodeUser).then((user) => {
      RoleTypes.findOne({
        where: { role_name: "STUDENT" },
      }).then((role) => {
        user.setRoleType(role);
        const payload = {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          phone_number: user.phone_number,
          student_id: user.student_id,
          status: user.status,
          role_name: role.role_name,
        };
        const accessToken = createAccessToken(payload);
        res.status(200).json({
          status: "Success",
          messages: "Login successfully!",
          data: {
            user: payload,
            accessToken,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      messages: error.message,
    });
  }
};

module.exports = {
  signIn,
  signUp,
};
