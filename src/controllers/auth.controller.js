const jwt = require("jsonwebtoken");
const { getStudentId, checkEmailDomain } = require("../utils/email.utils");
const { Users, RoleTypes, Wallet } = require("../models");
const { v4: uuidv4 } = require("uuid");
const currentDate = require("../utils/currentDate");
require("dotenv").config();
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const signIn = async (req, res) => {
  try {
    const { accessToken } = req.body
    const googlePayload = jwt.decode(
      accessToken,
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
        profile_img: userLogin.profile_img,
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
      checkEmailDomain(googlePayload.email, ["fpt.edu.vn"])
        ? signUp(req, res)
        : res.status(400).json({
          status: "Fail",
          messages:
            "Please contact your administrator to support your account!",
        });
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
      profile_img: googlePayload.picture,
      createdAt: new Date(),
      updartedAt: new Date(),
      status: true,
    };

    await Users.create(decodeUser).then((user) => {
      RoleTypes.findOne({
        where: { role_name: "STUDENT" },
      }).then((role) => {
        user.setRoleType(role);
        Wallet.create({
          id: uuidv4(),
          user_id: user.id,
          balance: 0,
          createdAt: currentDate(),
          updatedAt: currentDate(),
        }).then((wallet) => {
          console.log("Wallet created successfully!");
          const payload = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            student_id: user.student_id,
            profile_img: user.profile_img,
            status: user.status,
            role_name: role.role_name,
            wallet_id: wallet.id,
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
        })

      });
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      messages: error.message,
    });
  }
};
//Sign driver
const signInPhoneNumber = async (req, res) => {
  try {
    const { phone, methodVerify } = req.body
    if (phone == undefined) {
      return res.status(400).json({
        status: "Fail",
        messages:
          "Not enough params !!",
      });
    }
    const userLogin = await Users.findOne({
      where: {
        phone_number: phone,
        role_id: 3,
        status: true,
      },
      include: [
        {
          model: RoleTypes,
          attributes: ["role_name"],
        },
      ],
    });
    if (userLogin == undefined) {
      return res.status(400).json({
        status: "Fail",
        messages:
          "Your phone number is not registered! Please contact your administrator to support your account!",
      });
    }
    if (phone) {
      client.verify.v2.services(process.env.SERVICE_ID).verifications.create({
        to: `+84${phone}`,
        channel: methodVerify === 'call' ? 'call' : 'sms'
      })
        .then(data => {
          res.status(200).send({
            status: "Success",
            messages: "Verification is sent!!",
            Phone: phone,
            data
          })
        })
    } else {
      res.status(400).send({
        status: "Fail",
        messages: "Wrong phone number!!!",
        Phone: phone,
        data
      })
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
//Verify code phone number
const verifyCodeNumber = async (req, res) => {
  try {
    const { phone, code } = req.body
    console.log("Phone:", phone);
    console.log("Code:", code);
    //check param
    if (code != undefined && phone != undefined) {
      //check phone number đã được đăng kí chưa ?
      const userLogin = await Users.findOne({
        where: {
          phone_number: phone,
          status: 3,
          status: true,
        },
        include: [
          {
            model: RoleTypes,
            attributes: ["role_name"],
          },
        ],
      });
      console.log("userLogin:", userLogin);
      if (userLogin != undefined) {
        const payload = {
          id: userLogin.id,
          fullname: userLogin.fullname,
          email: userLogin.email,
          phone_number: userLogin?.phone_number,
          student_id: userLogin.student_id,
          profile_img: userLogin.profile_img,
          status: userLogin.status,
          role_name: userLogin.RoleType.role_name,
        };
        //check mã code để verify phone number
        client.verify.v2.services(process.env.SERVICE_ID)
          .verificationChecks
          .create({ to: `+84${phone}`, code })
          .then(verification_check => {
            console.log(verification_check.status)
            if (verification_check.status === "approved") {
              const accessToken = createAccessToken(payload);
              res.status(200).json({
                status: "Success",
                messages: "Login successfully!",
                data: {
                  user: payload,
                  accessToken,
                },
              });
            }
          });
      } else {
        res.status(400).json({
          status: "Fail",
          messages:
            "Your phone number is not registered! Please contact your administrator to support your account!",
        });
      }
    } else {
      res.status(400).send({
        status: "Fail",
        messages: "Not enough params!!!",
        Phone: phone,
        data
      })
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
module.exports = {
  signIn,
  signUp,
  signInPhoneNumber,
  verifyCodeNumber
};
