const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const pageValidation = require('../../validations/page.validation');
const { pageController } = require('../../controllers');
const upload = require('../../middlewares/upload');

const router = express.Router();

router
  .route('/')
  .post(/*auth('managePages'), */ upload.single('image_url'), validate(pageValidation.createPage), pageController.createPage)
  .get(/*auth('getPages'), validate(pageValidation.getPages),*/ pageController.getPages);


router
  .route('/:pageId/categories')
  .get(/*auth('getPages'), validate(pageValidation.getPages),*/ pageController.getPages);


router
  .route('/:pageId')
  .get(/*auth('getPages'),  validate(pageValidation.getPage), */pageController.getPage)
  .patch(/*auth('managePages'), validate(pageValidation.updatePage), */upload.single('image_url'), validate(pageValidation.updatePage), pageController.updatePage)
  .delete(/*auth('managePages'), validate(pageValidation.deletePage), */pageController.deletePage);

module.exports = router;


// /**
//  * @swagger
//  * tags:
//  *   name: Pages
//  *   description: Page management and retrieval
//  */

// /**
//  * @swagger
//  * /pages:
//  *   post:
//  *     summary: Create a page
//  *     description: Only admins can create other pages.
//  *     tags: [Pages]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - image_url
//  *               - isVisible
//  *             properties:
//  *               name:
//  *                 type: string
//  *               isVisible:
//  *                 type: boolean
//  *             example:
//  *               name: fake name
//  *               isVisible: "true"
//  *               image_url: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Page'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *
//  *   get:
//  *     summary: Get all pages
//  *     description: Only admins can retrieve all pages.
//  *     tags: [Pages]
//  *     parameters:
//  *       - in: query
//  *         name: sortBy
//  *         schema:
//  *           type: string
//  *         description: sort by query in the form of field:desc/asc (ex. name:asc)
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *         default: 10
//  *         description: Maximum number of pages
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           default: 1
//  *         description: Page number
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 results:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Page'
//  *                 page:
//  *                   type: integer
//  *                   example: 1
//  *                 limit:
//  *                   type: integer
//  *                   example: 10
//  *                 totalPages:
//  *                   type: integer
//  *                   example: 1
//  *                 totalResults:
//  *                   type: integer
//  *                   example: 1
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  */

// /**
//  * @swagger
//  * /pages/{id}:
//  *   get:
//  *     summary: Get a page
//  *     description: Logged in pages can fetch only their own page information. Only admins can fetch other pages.
//  *     tags: [Pages]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Page id
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Page'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   patch:
//  *     summary: Update a page
//  *     description: Logged in pages can only update their own information. Only admins can update other pages.
//  *     tags: [Pages]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Page id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               isVisible:
//  *                 type: boolean
//  *               image_url:
//  *                 type: string
//  *             example:
//  *               name: fake name
//  *               isVisible: "true"
//  *               image_url: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Page'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   delete:
//  *     summary: Delete a page
//  *     description: Logged in pages can delete only themselves. Only admins can delete other pages.
//  *     tags: [Pages]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Page id
//  *     responses:
//  *       "200":
//  *         description: No content
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  */


