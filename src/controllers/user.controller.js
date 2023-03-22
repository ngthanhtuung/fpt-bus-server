const { Users, RoleTypes, Wallet, Bus } = require("../models");
const Sequelize = require("sequelize");
const validator = require("validator");
const { checkEmailDomain } = require("../utils/email.utils");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");
const currentDate = require("../utils/currentDate");
const { checkBusIsOperating } = require('../controllers/bus.controller');
const { pushNotiByTopic } = require("./notification.controller");

const validate = (fullname, email, phone_number) => {
  const errors = {};
  const regex =
    /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|86|99))|((8|9)((?!5)[0-9])))([0-9]{7})$/;
  if (validator.isEmpty(fullname)) {
    errors.fullname = "Fullname is required!";
  }
  if (!validator.isLength(fullname, { min: 3, max: 50 })) {
    errors.fullname = "Fullname must be between 3 and 50 characters!";
  }
  if (
    email &&
    (!validator.isEmail(email) ||
      !checkEmailDomain(email, ["fe.edu.vn", "fpt.edu.vn"]))
  ) {
    errors.email = "Email is invalid!";
  }
  if (phone_number && !regex.test(phone_number)) {
    errors.phone_number = "Phone number is invalid!";
  }
  return errors;
};

const checkExisted = async (email, phone_number) => {
  const errors = {};
  const checkEmail = email || "";
  const checkPhone = phone_number || "";
  if (checkEmail === "" && checkPhone === "") {
    return errors;
  }
  if (checkEmail.length > 0) {
    const existedUser = await Users.findOne({
      where: {
        email: checkEmail,
      },
    });
    if (existedUser) {
      if (existedUser.email === email) {
        errors.email = "Email already exists!";
      }
    }
  }
  if (checkPhone.length > 0) {
    const existedUser = await Users.findOne({
      where: {
        phone_number: checkPhone,
      },
    });
    if (existedUser) {
      if (existedUser.phone_number === checkPhone) {
        errors.phone = "Phone already exists!";
      }
    }
  }
  return errors;
};

const findAllUser = async (req, res) => {
  try {
    const search_query = req.query.search_query || "";
    const role_name = req.query.role_name || "";
    const status = req.query.status;
    console.log("Query status: ", status);
    console.log("Type of status: ", typeof status);
    const limit =
      !isNaN(Math.abs(parseInt(req.query.limit))) &&
        Math.abs(parseInt(req.query.limit)) > 0
        ? Math.abs(parseInt(req.query.limit))
        : 10;
    const page =
      !isNaN(Math.abs(parseInt(req.query.page))) &&
        Math.abs(parseInt(req.query.limit)) > 0
        ? Math.abs(parseInt(req.query.page))
        : 1;
    const offset = (page - 1) * limit;

    let where;
    let include = {
      model: RoleTypes,
      attributes: ["role_name"],
    };

    if (search_query != "") {
      where = {
        [Op.or]: [
          { student_id: { [Op.like]: `%${search_query}%` } },
          { email: { [Op.like]: `%${search_query}%` } },
          { fullname: { [Op.like]: `%${search_query}%` } },
          { phone_number: { [Op.like]: `%${search_query}%` } },
        ],
      };
    }
    if (
      status != undefined &&
      status != "" &&
      status != null &&
      status != "null" &&
      status != "undefined"
    ) {
      where = {
        status: JSON.parse(status),
      };
    } else {
      where = {
        ...where,
      };
    }

    if (role_name) {
      include = {
        ...include,
        where: {
          role_name: role_name,
        },
      };
    }
    const { count, rows } = await Users.findAndCountAll({
      where,
      include: [include],
      limit,
      offset,
    });
    res.status(200).json({
      status: "Success",
      messages: "Get all user successfully!",
      pagination: {
        total: count,
        per_page: limit,
        current_page: page,
        total_page: Math.ceil(count / limit),
      },
      data: rows,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { fullname, email, phone_number, student_id, profile_img, role_id } =
      req.body;
    const errors_validation = validate(fullname, email, phone_number);
    const error_check_existed = await checkExisted(email, phone_number);
    const errors = { ...errors_validation, ...error_check_existed };
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        messages: errors,
      });
    } else {
      const user = await Users.create({
        id: uuid(),
        fullname,
        email,
        phone_number,
        student_id,
        profile_img,
        role_id,
        createdAt: currentDate(),
        updatedAt: currentDate(),
      });
      const role = await RoleTypes.findOne({
        where: {
          id: user.role_id,
        },
      });
      const dataResponse = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        student_id: user.student_id,
        profile_img: user.profile_img,
        role_name: role.role_name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res.status(201).json({
        status: "Success",
        messages: "Created user successfully",
        data: dataResponse,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.messages,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      fullname,
      email,
      phone_number,
      student_id,
      profile_img,
      role_id,
      status,
    } = req.body;
    const errors_validation = validate(fullname, email, phone_number);
    const error_check_existed = await checkExisted(email, phone_number);
    const errors = { ...errors_validation };
    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        status: "Fail",
        messages: errors,
      });
    } else {
      const checkExistedUser = await Users.findOne({ where: { id: userId } });
      if (!checkExistedUser) {
        res.status(404).json({
          status: "Fail",
          messages: "User not found!",
        });
      } else {
        //If user is login in is ADMIN
        if (req.role_name === "ADMIN") {
          const role_name = await RoleTypes.findOne({ where: { id: role_id } });
          //If update user is login in user
          console.log("Check existed user id: ", checkExistedUser.id);
          console.log("User login in id: ", req.user_id);
          if (checkExistedUser.id === req.user_id) {
            //Don't allow update role and status of login in user
            if (status != req.status || role_name.role_name != req.role_name) {
              res.status(400).json({
                status: "Fail",
                messages: "You can't change your role or status!",
              });
            } else {
              const updatedUser = await Users.update(
                {
                  fullname,
                  phone_number,
                  profile_img,
                  updatedAt: currentDate()
                },
                {
                  where: {
                    id: userId,
                  },
                }
              );
              const user = await Users.findOne({
                where: { id: userId },
                include: [
                  {
                    model: RoleTypes,
                    attributes: ["role_name"],
                  }
                ]
              })
              res.status(200).json({
                status: "Success",
                message: `${user.fullname} updated successfully!`,
                data: user,
              });
            }
          } else {
            //ADMIN can update another user with DRIVER and STUDENT role.
            const updatedUser = await Users.update(
              {
                fullname,
                email,
                phone_number,
                student_id,
                profile_img,
                role_id,
                status,
                updatedAt: currentDate()
              },
              {
                where: {
                  id: userId,
                },
              }
            );
            const user = await Users.findOne({
              where: { id: userId },
              include: [
                {
                  model: RoleTypes,
                  attributes: ["role_name"],
                }
              ]
            })
            res.status(200).json({
              status: "Success",
              message: `${user.fullname} updated successfully!`,
              data: user,
            });
          }
        } else {
          const updatedUser = await Users.update(
            {
              fullname,
              phone_number,
              profile_img,
              updatedAt: currentDate()
            },
            {
              where: {
                id: userId,
              },
            }
          );
          const user = await Users.findOne({
            where: { id: userId },
            include: [
              {
                model: RoleTypes,
                attributes: ["role_name"],
              }
            ]
          })
          res.status(200).json({
            status: "Success",
            message: `${user.fullname} updated successfully!`,
            data: user,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const userLogin = req.user_id;
    const checkExistedUser = await Users.findByPk(id);
    if (!checkExistedUser) {
      res.status(404).json({
        status: "Fail",
        messages: "User not found!",
      });
    } else if (id === userLogin) {
      res.status(400).json({
        status: "Fail",
        messages: "You're loggin into the system. Operation denied!",
      });
    } else {
      if (checkExistedUser.dataValues.role_id === 3) {
        const checkDriver = await Bus.findOne({
          where: {
            driver_id: id,
          }
        })
        if (checkDriver) {
          const bus = await checkBusIsOperating(checkDriver.dataValues.id);
          if (bus > 0) {
            return res.status(400).json({
              status: "Fail",
              messages: "Driver is operating bus. Operation denied!",
            });
          } else {
            const updatedUser = await Users.update(
              {
                status: !checkExistedUser.status,
                updatedAt: currentDate(),
              },
              {
                where: {
                  id,
                },
              }
            ).then(() => {
              Users.findOne({
                where: {
                  id,
                },
                include: [
                  {
                    model: RoleTypes,
                    attributes: ["role_name"],
                  },
                ],
              }).then((user) => {
                if (user.status === true) {
                  return res.status(200).json({
                    status: "Success",
                    message: "User is enabled!",
                    data: user,
                  });
                } else {
                  return res.status(200).json({
                    status: "Success",
                    message: "User is disabled!",
                    data: user,
                  });
                }
              });
            });
          }
        } else {
          const updatedUser = await Users.update(
            {
              status: !checkExistedUser.status,
              updatedAt: currentDate(),
            },
            {
              where: {
                id,
              },
            }
          ).then(() => {
            Users.findOne({
              where: {
                id,
              },
              include: [
                {
                  model: RoleTypes,
                  attributes: ["role_name"],
                },
              ],
            }).then((user) => {
              if (user.status === true) {
                return res.status(200).json({
                  status: "Success",
                  message: "User is enabled!",
                  data: user,
                });
              } else {
                return res.status(200).json({
                  status: "Success",
                  message: "User is disabled!",
                  data: user,
                });
              }
            });
          });
        }
      } else {
        const updatedUser = await Users.update(
          {
            status: !checkExistedUser.status,
            updatedAt: currentDate(),
          },
          {
            where: {
              id,
            },
          }
        ).then(() => {
          Users.findOne({
            where: {
              id,
            },
            include: [
              {
                model: RoleTypes,
                attributes: ["role_name"],
              },
            ],
          }).then((user) => {
            if (user.status === true) {
              return res.status(200).json({
                status: "Success",
                message: "User is enabled!",
                data: user,
              });
            } else {
              return res.status(200).json({
                status: "Success",
                message: "User is disabled!",
                data: user,
              });
            }
          });
        });
      }

    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        user_id: req.user_id,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "fullname", "email", "student_id"]
        }
      ]
    })
    if (wallet) {
      res.status(200).json({
        status: "Success",
        message: "Get wallet successfully!",
        data: wallet
      })
    } else {
      res.status(404).json({
        status: "Fail",
        message: "Wallet not found!",
      })
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    })
  }
}

const userPushNoti = async (req, res) => {
  try {
    const { title, content } = req.body
    const { idUser } = req.params
    pushNotiByTopic(`USER_${idUser}`, title, content);
    console.log("checkPushNoti:", checkPushNoti);
    res.status(200).json({
      status: "Success",
      message: "Sent notification for user successfully !!",
    })
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: err.message,
    })
  }
}

module.exports = {
  findAllUser,
  createUser,
  updateUser,
  changeStatus,
  getWallet,
  userPushNoti
};
