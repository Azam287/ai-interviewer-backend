const HBLogger = require(process.cwd() + "/utility/logger").logger;
const uploadManager = require("../managers/upload");
const { commonFunctions } = require("../../utility/commonfunctions");

const uploadFile = async (req, res, next) => {
  try {
    const result = await uploadManager.processUpload(req);
    res
      .status(200)
      .send(commonFunctions.responseFormatter(1, "Success", result));
  } catch (error) {
    HBLogger.error("Error in createMember:", error);
    res
      .status(500)
      .send(commonFunctions.responseFormatter(0, error?.message, { ...error }));
    next(error);
  }
};

module.exports = {
  uploadFile,
};
