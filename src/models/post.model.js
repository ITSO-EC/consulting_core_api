const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const postSchema = mongoose.Schema(
  {
    ro: { type: String, required: true, trim: true },
    type_reform: { type: String, required: true, trim: true },
    file_url: { type: String, required: true, trim: true },
    image_url: { type: String, required: true, trim: true },
    legal_regulation: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
