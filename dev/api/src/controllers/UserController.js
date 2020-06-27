const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = {
  async store(req, res) {
    const user = await User.create({
      name: "Admin",
      login: "admin",
      password: "123456",
    });
  },

  async authenticate(req, res) {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Senha inválida" });

    user.password = null;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.send({ user, token });
  },
};
