const {
  uploadFile,
} = require("../controllers/upload");

const middlewares = require("../middlewares/upload");

let uploadRoutes = [
  {
    type: "post",
    path: "/create",
    middlewares: [middlewares.upload.single("file")],
    controller: uploadFile,
  }
];

module.exports = {
  uploadRoutes,
};
