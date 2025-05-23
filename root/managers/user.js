const userService = require("../services/user");
const { createSession, findOneAndUpdateSession } = require("../services/session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const SESSION_EXPIRY = 1000 * 60 * 60 * 2;

const signUpUserManager = async ({ name, email, password }) => {
  const exists = await userService.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const hash = await bcrypt.hash(password, 10);
  const user = await userService.create({ name, email, passwordHash: hash });

  return { userId: user._id, message: "User registered successfully" };
};

const loginUserManager = async (data, ip, userAgent) => {
  const { email, password } = data;
  const user = await userService.findOne({email})

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid email or password");
  }

  const sessionId = uuidv4();
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_EXPIRY);

  await findOneAndUpdateSession(
    { userId: user._id, userAgent },
    {
      userId: user._id,
      sessionId,
      ipAddress: ip,
      userAgent,
      expiresAt: expires,
    },
    { upsert: true, new: true }
  );

  const token = jwt.sign(
    { userId: user._id.toString(), sessionId },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  await userService.updateOne({ _id: user._id }, { lastLogin: now });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const logoutUserManager = async (sessionId) => {
  return findOneAndUpdateSession({ sessionId }, { isValid: false });
};

module.exports = {
  signUpUserManager,
  loginUserManager,
  logoutUserManager
};
