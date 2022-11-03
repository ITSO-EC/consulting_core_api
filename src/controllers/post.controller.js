const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');
const fs = require('fs').promises

const createPost = catchAsync(async (req, res) => {
  // try {
  //   const cadena =
  //     `*Movimiento detectado*,\n\
  //   Creación de post\n\
  //   *Titulo:*  ${req.body.title}`;
  //   wsService.sendMessage(593978701575, cadena)
  // } catch (error) {
  //   console.log(error)
  // }
  try {
    req.body.file_url = req.file?.filename;
  }
  catch (err) {
    console.log(err);
  }
  const post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['byCategory', 'name', "title",
    "ro",
    "type_reform",
    "legal_regulation",
    "content",
    "number",
    "type", "status", "reference"]);
  if (filter.byCategory != undefined) {
    filter.category = filter.byCategory;
    delete filter.byCategory
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

const searchPosts = catchAsync(async (req, res) => {

  const filter = pick(req.query, [
    'byCategory', 'name', "title",
    "ro",
    "type_reform",
    "legal_regulation",
    "content",
    "number",
    "type", "status", "reference"]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const keyWord = req.params.data;
  if (filter.byCategory != undefined) {
    filter.category = filter.byCategory;
    delete filter.byCategory
  }
  const result = await postService.queryPosts({ title: { $regex: keyWord, $options: 'i' } }, options);
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
    req.body.file_url = req.file?.filename;
  }
  catch (err) {
    console.log(err);
  }
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  console.log(post.file_url)

  const files = [
    post.file_url,
    post.image_url,
  ]
  Promise.all(files.map(file => fs.unlink("uploads/" + file)))
    .then(() => {
      console.log('All files removed')
    })
    .catch(err => {
      console.error('Something wrong happened removing files', err)
    })
  await postService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});




const getFile = catchAsync(async (req, res) => {
  const { fileId } = req.params;
  res.sendFile(require('path').join(__dirname, '../../uploads/' + fileId));
});


module.exports = {
  searchPosts,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getFile
};
