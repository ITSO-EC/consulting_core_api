const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const postValidation = require('../../validations/post.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(/*auth('manageCategories'), validate(postValidation.createCategory), */ categoryController.createCategory)
  .get(/*auth('getCategories'), validate(postValidation.getCategories), */categoryController.getCategories);

router
  .route('/:categoryId')
  .get( /*auth('getCategories'), validate(postValidation.getCategory), */ categoryController.getCategory)
  .patch(/* auth('manageCategories'), validate(postValidation.updateCategory),  */ categoryController.updateCategory)
  .delete(/*auth('manageCategories'), validate(postValidation.deleteCategory),*/ categoryController.deleteCategory);

module.exports = router;
