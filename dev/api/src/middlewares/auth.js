const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ error: true, message: "Token inválido", type: "error" });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    return res
      .status(401)
      .send({ error: true, message: "Token inválido", type: "error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send({ error: true, message: "Token inválido", type: "error" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .send({ error: true, message: "Token inválido", type: "error" });

    req.userId = decoded.id;

    return next();
  });
};
