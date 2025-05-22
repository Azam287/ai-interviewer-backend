const Joi = require("joi");
const mongoose = require("mongoose");

const uploadValidation = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  type: Joi.string().valid("resume", "job_description").required(),
});

module.exports = { uploadValidation };
