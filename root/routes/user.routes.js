const userController = require("../controllers/user");

let userRoutes = [
  {
    type: "post",
    path: "/signup",
    controller: userController.signUpUser,
  },
  {
    type: "post",
    path: "/login",
    controller: userController.loginUser,
  },
  {
    type: "post",
    path: "/logout",
    controller: userController.logoutUser,
  }
];

module.exports = {
  userRoutes,
};
