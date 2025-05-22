const Joi = require("joi");

const signInValidation = (data) => {
  const signinSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const validationResult = signinSchema.validate(data);
  if (validationResult?.error)
    return { valid: 0, message: validationResult?.error };
  return { valid: 1, message: "success" };
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signInValidation, loginSchema };
