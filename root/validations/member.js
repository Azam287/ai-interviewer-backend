const Joi = require("joi");

const validateCreateMemberData = (dataToCheck) => {
  const createMemberValidationSchema = Joi.object({
    name: Joi.string().max(20).optional(),
    email: Joi.string().email().max(100).required(),
    age: Joi.number().integer().optional(),
    phone_number: Joi.string().max(15).optional(),
    profile_picture_url: Joi.string().uri().optional(),
    status: Joi.string()
      .valid("ACTIVE", "INACTIVE", "PENDING")
      .default("ACTIVE"),
    role_id: Joi.string().uuid().optional(),
    organization_id: Joi.string().uuid().required(),
  });

  const validationResult = createMemberValidationSchema.validate(dataToCheck);
  if (validationResult?.error)
    return { valid: 0, message: validationResult?.error };
  return { valid: 1, message: "success" };
};

module.exports = {
  validateCreateMemberData,
};
