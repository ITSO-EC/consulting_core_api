const Joi = require('joi');
const { password, objectId } = require('./custom.validation');






const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    ro: Joi.string().required(),
    type_reform: Joi.string().required(),
    // file_url: Joi.string().required(),
    // image_url: Joi.string().required(),
    legal_regulation: Joi.string().required(),
    content: Joi.string().required(),
    number: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    reference: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      phone_number: Joi.string(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
