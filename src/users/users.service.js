const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserSevice = (body) => User.create(body);

module.exports = { findByEmailUserService, createUserSevice };
