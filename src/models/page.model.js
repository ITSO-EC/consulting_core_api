const mongoose = require('mongoose');
const validator = require('validator');
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
 * @typedef Page
 */
const Page = mongoose.model('Page', postSchema);

module.exports = Page;
