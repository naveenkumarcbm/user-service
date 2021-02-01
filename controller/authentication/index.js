const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Messages } = require("../../constants");
const UserModel = require("../../models/user");

class AuthController {
  constructor() {}

  async register(req, res) {
    try {
      req.body.password = await bcrypt.hash(
        req.body.password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
      const body = { ...req.body, ...{ name: req.body.username } };
      let model = new UserModel(body);
      const user = await model.save();
      let userObj = { name: user.name, role: user.role, id: user._id };
      const token = jwt.sign(userObj, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "1800s",
      });
      res.json({ token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async login(req, res) {
    try {
      const user = await UserModel.findOne({ name: req.body.username }).exec();
      if (!user) {
        res.json({ status: 404, message: Messages.USER_NOT_FOUND }).status(404);
        return;
      }
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        let userObj = { name: user.name, role: user.role, id: user._id };
        const token = jwt.sign(userObj, process.env.JWT_TOKEN_SECRET, {
          expiresIn: "1800s",
        });
        res.json({ token: token });
      } else {
        res.json({ status: 401, message: Messages.INVALID_PWD }).status(401);
      }
    } catch (error) {
      res.send(error).status(401);
    }
  }
}

module.exports = AuthController;
