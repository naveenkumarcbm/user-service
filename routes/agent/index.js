const express = require("express");
const agentRouter = express.Router();

const AgentController = require("../../controller/agent");
const UserController = require("../../controller/user");
const checkForRole = require("../../middlewares/role-check");
const validator = require("../../middlewares/validator");
const agentValidator = require("../../validators/agent");
const controller = new AgentController();
const userController = new UserController() 

agentRouter.get("/", userController.getAllUsers)
agentRouter.get("/:id", userController.getUserById)
agentRouter.post("/", agentValidator.create, validator, checkForRole, controller.addAgent)
agentRouter.put("/:id", agentValidator.create, validator, userController.updateUser)

module.exports = agentRouter;