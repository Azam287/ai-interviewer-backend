const HBLogger = require(process.cwd() + "/utility/logger").logger;
const { signUpUserManager } = require("../managers/user");
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
    HBLogger.error("Error in createMember:", error);
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
    next(error);
  }
};

module.exports = {
  signUpUser,
};
