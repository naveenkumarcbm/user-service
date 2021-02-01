const { body, custom } = require("express-validator");
const UserModel = require("../models/user");

const userValidator = {
  create: [
    body("username").isLength({ min: 3, max: 50 }).custom(async (val, { req }) => {
        const user =  await UserModel.findOne({name: req.body.username});
        if(user && user.name === req.body.username){
            return Promise.reject('User name already exist');
        }
     }),
    body("password").isLength({ min: 5, max: 15 }),
    body("isActive").optional().isBoolean(),
    body("role").optional(true).isNumeric(),

  ],
  login: [
    body("username").isLength({ min: 3, max: 50 }),
    body("password").isLength({ min: 5, max: 15 })
  ],
  edit: [
    body("password").isLength({ min: 5, max: 15 }),
    body("isActive").optional().isBoolean(),
    body("role").optional().isNumeric()
  ]
};

module.exports = userValidator;
