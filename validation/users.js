const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

const validateLoginInput = (input) => {
  const schema = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(input);
}

const validateRegisterInput = (input) => {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().max(255).required(),
  });

  return schema.validate(input);
}

const validateEmail = (input) => {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
  });

  return schema.validate(input);
}

const validatePassword = (input) => {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(input);
}

module.exports = {
  validateUser,
  validateRegisterInput,
  validateEmail,
  validateLoginInput,
  validatePassword
}
