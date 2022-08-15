const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image_url: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);


/**
 * @typedef Category
 */
const Category = mongoose.model('Category', postSchema);

module.exports = Category;