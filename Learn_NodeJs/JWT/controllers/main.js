const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide a username and password");
  }
  // just for demo
  const id = new Date().getDate();
  // try to keep payload small, better user experience
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data `,
  });
};

module.exports = { login, dashboard };
