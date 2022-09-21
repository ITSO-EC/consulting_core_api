const Joi = require('joi');
const { password, objectId } = require('./custom.validation');






const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    ro: Joi.string().required(),
    type_reform: Joi.string().required(),
    file_url: Joi.string().optional(),
    image_url: Joi.string().optional(),
    legal_regulation: Joi.string().required(),
    content: Joi.string().required(),
    number: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    reference: Joi.string().required(),
    category: Joi.string().custom(objectId),
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
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      ro: Joi.string().required(),
      type_reform: Joi.string().required(),
      file_url: Joi.string().optional(),
      image_url: Joi.string().optional(),
      legal_regulation: Joi.string().required(),
      content: Joi.string().required(),
      number: Joi.string().required(),
      type: Joi.string().required(),
      status: Joi.string().required(),
      reference: Joi.string().required(),
      category: Joi.string().custom(objectId),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
