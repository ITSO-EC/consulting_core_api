const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const orderSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    file_url: { type: String, required: false, trim: true },
    type: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true },
    canceledAt: { type: Date, required: false, trim: true },
    price: { type: Number, default: 20, trim: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    isVisible: { type: Boolean, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
