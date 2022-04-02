const User = require("./User");

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserSevice = (body) => User.create(body);

const findAllUserService = () => User.find();

module.exports = {
  findByEmailUserService,
  createUserSevice,
  findAllUserService,
};
