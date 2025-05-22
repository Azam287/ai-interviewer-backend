const userService = require("../services/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// const SESSION_EXPIRY = 1000 * 60 * 60 * 2;

const signUpUserManager = async ({ name, email, password }) => {
  const exists = await userService.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const hash = await bcrypt.hash(password, 10);
  const user = await userService.create({ name, email, passwordHash: hash });

  return { userId: user._id, message: "User registered successfully" };
};

module.exports = {
  signUpUserManager,
};
