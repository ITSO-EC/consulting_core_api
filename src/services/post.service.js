const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  // if (await Post.isEmailTaken(postBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Post.create(postBody);
};

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};






// /**
//  * Get post by id
//  * @param {ObjectId} id
//  * @returns {Promise<Post>}
//  */

const getPostById = async (id) => {
  return Post.findById(id);
};

// /**
//  * Get post by email
//  * @param {string} email
//  * @returns {Promise<Post>}
//  */
// const getPostByEmail = async (email) => {
//   return Post.findOne({ email });
// };

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  // if (updateBody.email && (await Post.isEmailTaken(updateBody.email, postId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

const deletePosts = async (options) => {
  const posts = await Post.find(options).remove().exec();
  return posts;
};



module.exports = {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  // getPostByEmail,
  deletePostById,
  deletePosts
};
