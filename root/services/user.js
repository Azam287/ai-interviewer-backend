const User = require("../models/User");

const findOne = (query) => {
  return User.findOne(query);
};

const updateOne = (query, data) => {
  return User.updateOne(query, data);
};

const create = (body) => {
  return User.create(body);
};

module.exports = {
  findOne,
  updateOne,
  create,
};
