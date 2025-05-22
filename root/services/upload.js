const Upload = require('../models/Upload');

const storeUpload = async (parsedFile, body) => {

  const { userId, type } = body;

  const result =  await Upload.updateOne(
    { userId, type },
    {
      $set: {
        type,
        content: parsedFile?.text || ""
      },
    },
    { upsert: true }
  )

  return result;
};

module.exports = {
  storeUpload,
};
