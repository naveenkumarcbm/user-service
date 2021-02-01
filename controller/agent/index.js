const bcrypt = require("bcrypt");
const UserModel = require("../../models/user");

class AgentController {
  constructor() {}

  async addAgent(req, res) {
    try {
      req.body.password = await bcrypt.hash(
        req.body.password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
      const body = { ...req.body, ...{ name: req.body.agentname, role: 1 } };
      let model = new UserModel(body);
      const user = await model.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = AgentController;
