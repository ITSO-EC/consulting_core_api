const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const pageValidation = require('../../validations/page.validation');
const pageController = require('../../controllers/page.controller');

const router = express.Router();

router
  .route('/')
  .post(/*auth('managePages'),  validate(pageValidation.createPage),*/ pageController.createPage)
  .get(/*auth('getPages'), validate(pageValidation.getPages),*/ pageController.getPages);

router
  .route('/:pageId')
  .get(/*auth('getPages'),  validate(pageValidation.getPage), */pageController.getPage)
  .patch(/*auth('managePages'), validate(pageValidation.updatePage), */pageController.updatePage)
  .delete(/*auth('managePages'), validate(pageValidation.deletePage), */pageController.deletePage);

module.exports = router;
