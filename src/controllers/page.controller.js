const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageService } = require('../services');

const createPage = catchAsync(async (req, res) => {
  const page = await pageService.createPage(req.body);
  res.status(httpStatus.CREATED).send(page);
});

const getPages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await pageService.queryPages(filter, options);
  res.send(result);
});

const getPage = catchAsync(async (req, res) => {
  const page = await pageService.getPageById(req.params.pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  res.send(page);
});

const updatePage = catchAsync(async (req, res) => {
  const page = await pageService.updatePageById(req.params.pageId, req.body);
  res.send(page);
});

const deletePage = catchAsync(async (req, res) => {
  await pageService.deletePageById(req.params.pageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPage,
  getPages,
  getPage,
  updatePage,
  deletePage,
};
