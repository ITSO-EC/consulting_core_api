const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image_url: Joi.string().optional(),
    isVisible: Joi.string().required(),
  }),
};

const getPages = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPage = {
  params: Joi.object().keys({
    pageId: Joi.string().custom(objectId),
  }),
};

const updatePage = {
  params: Joi.object().keys({
    pageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      image_url: Joi.string().optional(),
      isVisible: Joi.string().required(),
    })
    .min(1),
};

const deletePage = {
  params: Joi.object().keys({
    pageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPage,
  getPages,
  getPage,
  updatePage,
  deletePage,
};
