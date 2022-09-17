const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  try {
    req.body.file_url = req.files?.file_url[0]?.path ?? null;
    req.body.image_url = req.files?.image_url[0]?.path ?? null;
  }
  catch (err) {
    console.log(err);
  }
  const post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['byCategory', 'name']);
  if (filter.byCategory != undefined) {
    filter.category = filter.byCategory;
    delete filter.byCategory
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  try {
    req.body.file_url = req.files?.file_url[0]?.path ?? null;
    req.body.image_url = req.files?.image_url[0]?.path ?? null;
  }
  catch (err) {
    console.log(err);
  }
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});




const getFile = catchAsync(async (req, res) => {
  const { fileId } = req.params;
  res.sendFile(require('path').join(__dirname, '../../uploads/' + fileId));
});


module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getFile
};
