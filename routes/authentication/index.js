const express = require("express");
const AuthController = require("../../controller/authentication");
const validator = require("../../middlewares/validator");
const userValidator = require("../../validators/user");
const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/register", userValidator.create, validator, authController.register);
authRouter.post("/login", userValidator.login, validator, authController.login);

module.exports = authRouter;