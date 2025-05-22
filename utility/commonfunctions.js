
const HBLogger = require(process.cwd() + "/utility/logger").logger;

//// On error goes to error middleware.
const requestWatch = fn => { 
    return (req, res, next) => { 
        fn(req, res, next).catch(next);
    };
}

const commonFunctions = {};

commonFunctions.createResponse = (success={},error={}) =>{
    let result = {};
    result.success = success;
    result.error = error;
    return result;
};

commonFunctions.responseFormatter = (success, message, result) => {
    return {
      success: success,
      message: message,
      result: result,
    };
  };

module.exports = { 
    requestWatch,
    commonFunctions,
}