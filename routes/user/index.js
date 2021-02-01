const express = require("express");
const userRouter = express.Router();

const UserController = require("../../controller/user");
const validator = require("../../middlewares/validator");
const userValidator = require("../../validators/user");
const controller = new UserController();

userRouter.get("/", controller.getAllUsers)
userRouter.get("/:id", controller.getUserById)
userRouter.post("/", userValidator.create, validator, controller.addUser)
userRouter.put("/:id", userValidator.create, validator, controller.updateUser)


module.exports = userRouter;