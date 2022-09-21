const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const upload = require('../../middlewares/upload');
const router = express.Router();

router
  .route('/')
  .post(/*auth('manageCategories'),*/upload.single('image_url'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(/*auth('getCategories'), */ categoryController.getCategories);

router
  .route('/:categoryId')
  .get( /*auth('getCategories'), validate(postValidation.getCategory), */ categoryController.getCategory)
  .patch(/* auth('manageCategories'),*/upload.single('image_url'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(/*auth('manageCategories'), validate(postValidation.deleteCategory),*/ categoryController.deleteCategory);

module.exports = router;
