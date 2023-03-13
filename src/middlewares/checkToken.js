const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Denied!" });
  }

  try {
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Invalid token!" });
  }
}

module.exports = { checkToken };
