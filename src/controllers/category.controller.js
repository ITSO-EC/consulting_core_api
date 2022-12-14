const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService, postService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  console.log(req.file)
  try {
    req.body.image_url = req.file.filename;
  }
  catch (err) {
    console.log(err);
  }
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['byPage', 'name']);
  if (filter.byPage != undefined) {
    filter.page = filter.byPage;
    delete filter.byPage
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  console.log(req.file)
  try {
    req.body.image_url = req.file.filename;
  }
  catch (err) {
    console.log(err);
  }
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  // await postService.deletePosts({ category: req.params.categoryId });
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const postsByCategory = await postService.queryPosts({ category: req.params.categoryId }, []);
  console.log(postsByCategory);
  if (postsByCategory.results.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category has posts');
  } else {
    await categoryService.deleteCategoryById(req.params.categoryId);
    res.status(httpStatus.NO_CONTENT).send();
  }
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
