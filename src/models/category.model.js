const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image_url: { type: String, required: false, trim: true },
    // isVisible: { type: Boolean, required: true, trim: true },
    page: { type: mongoose.Types.ObjectId, ref: "Page", required: true },
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
