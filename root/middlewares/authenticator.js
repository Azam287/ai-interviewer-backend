const { commonFunctions } = require("../../utility/commonfunctions");
const jwt = require("jsonwebtoken");
const Session = require("../model/session.model");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing token" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const session = await Session.findOne({
      sessionId: decoded.sessionId,
      isValid: true,
      expiresAt: { $gt: new Date() },
    });

    if (!session) throw new Error();

    res.status(200).send(
      commonFunctions.responseFormatter(0, error?.message, {
        userId: decoded.userId,
        sessionId: decoded.sessionId,
      })
    );

    next();
  } catch (error) {
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
  }
};
