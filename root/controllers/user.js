const HBLogger = require(process.cwd() + "/utility/logger").logger;
const { signUpUserManager, loginUserManager, logoutUserManager } = require("../managers/user");
const userValidation = require("../validations/user");

const { commonFunctions } = require("../../utility/commonfunctions");

const signUpUser = async (req, res, next) => {
  try {
    const { valid, message } = userValidation.signInValidation(req.body);
    if (!valid) {
      res
        .status(400)
        .send(commonFunctions.responseFormatter(valid, "Failed", message));
    }

    const data = await signUpUserManager(req.body);
    res.status(200).send(commonFunctions.responseFormatter(1, "Success", data));
  } catch (error) {
    HBLogger.error("Error in signUpUser:", error);
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { valid, message } = userValidation.loginValidation(req.body);
    if (!valid) {
      res
        .status(400)
        .send(commonFunctions.responseFormatter(valid, "Failed", message));
    }

    const { ip, headers, body } = req;

    const data = await loginUserManager(body, ip, headers['user-agent']);
    res.status(200).send(commonFunctions.responseFormatter(1, "Success", data));
  } catch (error) {
    HBLogger.error("Error in loginUser:", error);
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
    next(error);
  }
};


const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.user;
    if (!sessionId) {
      res
        .status(400)
        .send(commonFunctions.responseFormatter(valid, "Failed", message));
    }

    const data = await logoutUserManager(sessionId);
    res.status(200).send(commonFunctions.responseFormatter(1, "Success", data));
  } catch (error) {
    HBLogger.error("Error in logoutUser:", error);
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
    next(error);
  }
};

module.exports = {
  signUpUser,
  loginUser,
  logoutUser
};
