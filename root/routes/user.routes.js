const userController = require("../controllers/user");

let userRoutes = [
  {
    type: "post",
    path: "/signup",
    controller: userController.signUpUser,
  }
];

module.exports = {
  userRoutes,
};
