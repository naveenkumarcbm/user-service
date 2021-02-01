const bcrypt = require("bcrypt");
const UserModel = require("../../models/user");

class UserController {
  constructor() {}

  async getAllUsers(req, res) {
    const { sortBy = "dateCreated", order = -1, limit = 2 } = req.query;
    try {
      const users = await UserModel.find()
        .sort({ [sortBy]: order })
        .limit(Number(limit))
        .exec();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      let resp = {
        id: user._id,
        dateCreated: user.dateCreated,
      };
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async addUser(req, res) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS));
      const body = {...req.body, ...{name: req.body.username}};
      let model = new UserModel(body);
      const user = await model.save();
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async updateUser(req, res) {
    try {
    const { body } = req;
      const user = await UserModel.findByIdAndUpdate(req.params.id, body);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = UserController;
