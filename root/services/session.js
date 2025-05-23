const Session = require("../models/Session");

const createSession = (data) => {
  return Session.create(data);
};

const findOneAndUpdateSession = (query, data, optional={}) => {
  return Session.findOneAndUpdate(query, data, optional);
};

module.exports = {
  createSession,
  findOneAndUpdateSession,
};
