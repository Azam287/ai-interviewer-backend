const { uploadValidation } = require("../validations/upload");
const uploadService = require("../services/upload");
const pdfParse = require("pdf-parse");

const processUpload = async (req) => {
  const { error } = uploadValidation.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }

  if (!req.file) {
    const err = new Error("File is required.");
    err.status = 400;
    throw err;
  }

  const parsed = await pdfParse(req.file.buffer);

  return await uploadService.storeUpload(parsed, req.body);
};

module.exports = {
  processUpload,
};
