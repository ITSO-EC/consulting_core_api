const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phone_number: Joi.string(),
    image_url: Joi.string(),
    identification: Joi.string(),
    notificationApp: Joi.boolean().default(true),
    notificationEmail: Joi.boolean().default(true),
    notificationWhatsapp: Joi.boolean().default(true),
    role: Joi.string().required().valid('user', 'member', 'reviewer_1', 'reviewer_1', 'operator', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      phone_number: Joi.string(),
      image_url: Joi.string(),
      identification: Joi.string(),
      notificationApp: Joi.boolean().default(true),
      notificationEmail: Joi.boolean().default(true),
      notificationWhatsapp: Joi.boolean().default(true),
      role: Joi.string().valid('user', 'member', 'reviewer_1', 'reviewer_1', 'operator', 'admin'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
