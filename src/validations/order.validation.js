const Joi = require('joi');
const { password, objectId } = require('./custom.validation');


const createOrder = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    file_url: Joi.string(),
    type: Joi.string().required().valid('subscribed', 'refunded'),
    status: Joi.string().required().valid('pending', 'resolved', 'canceled'),
    canceledAt: Joi.date(),
    isVisible: Joi.boolean().required(),
    price: Joi.number().default(20),
    user: Joi.string().custom(objectId).required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    isVisible: Joi.boolean(),
    name: Joi.string(),
    user: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
    price: Joi.string(),
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
      type: Joi.string().required().valid('subscribed', 'refunded'),
      status: Joi.string().required().valid('pending', 'resolved', 'canceled'),
      canceledAt: Joi.date(),
      isVisible: Joi.boolean().required(),
      price: Joi.number().default(20),
      user: Joi.string().custom(objectId).required(),
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
