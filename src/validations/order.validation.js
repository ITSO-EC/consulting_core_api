const Joi = require('joi');
const { password, objectId } = require('./custom.validation');


const createOrder = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    file_url: Joi.string(),
    type: Joi.string().required().valid('subscribed', 'refunded'),
    canceledAt: Joi.date(),
    price: Joi.number().default(20),
    user: Joi.string().custom(objectId).required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    user: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      file_url: Joi.string(),
      price: Joi.number(),
      type: Joi.string().required().valid('subscribed', 'refunded'),
      canceledAt: Joi.date(),
      user: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
