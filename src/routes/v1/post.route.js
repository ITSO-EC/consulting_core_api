const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

const upload = require('../../middlewares/upload');

router
  .route('/')
  .post(/*auth('managePosts'),*/
    upload.fields([{
      name: 'file_url', maxCount: 1
    }, {
      name: 'image_url', maxCount: 1
    }]),
    validate(postValidation.createPost),
    postController.createPost)
  .get(/*auth('getPosts'), validate(postValidation.getPosts), */postController.getPosts);

router
  .route('/search/:data')
  .get(/*auth('getPosts'), validate(postValidation.getPosts), */postController.searchPosts);

router
  .route('/:postId')
  .get( /*auth('getPosts'), validate(postValidation.getPost), */ postController.getPost)
  .patch(upload.fields([{
    name: 'file_url', maxCount: 1
  }, {
    name: 'image_url', maxCount: 1
  }]),/* auth('managePosts'), validate(postValidation.updatePost),  */ postController.updatePost)
  .delete(/*auth('managePosts'), validate(postValidation.deletePost),*/ postController.deletePost);

module.exports = router;





// /**
//  * @swagger
//  * tags:
//  *   name: Posts
//  *   description: Post management and retrieval
//  */

// /**
//  * @swagger
//  * /Posts:
//  *   post:
//  *     summary: Create a post
//  *     description: Only admins can create other Posts.
//  *     tags: [Posts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - ro
//  *               - type_reform
//  *               - file_url
//  *               - image_url
//  *               - legal_regulation
//  *               - content
//  *               - number
//  *               - type
//  *               - status
//  *             properties:
//  *               ro:
//  *                 type: string
//  *             example:
//  *               ro: "test"
//  *               type_reform: "test"
//  *               file_url: "test"
//  *               image_url: "test"
//  *               legal_regulation: "test"
//  *               content: "test"
//  *               number: "test"
//  *               type: "test"
//  *               status: "test"
//  *     responses:
//  *       "201":
//  *         description: Created
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Post'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *
//  *   get:
//  *     summary: Get all Posts
//  *     description: All Posts.
//  *     tags: [Posts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: name
//  *         schema:
//  *           type: string
//  *         description: Post name
//  *       - in: query
//  *         name: role
//  *         schema:
//  *           type: string
//  *         description: Post role
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
//  *         description: Maximum number of Posts
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
//  *                     $ref: '#/components/schemas/Post'
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
//  * /Posts/{id}:
//  *   get:
//  *     summary: Get a post
//  *     description: Logged in Posts can fetch only their own post information. Only admins can fetch other Posts.
//  *     tags: [Posts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Post id
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Post'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   patch:
//  *     summary: Update a post
//  *     description: Logged in Posts can only update their own information. Only admins can update other Posts.
//  *     tags: [Posts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Post id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 description: must be unique
//  *               password:
//  *                 type: string
//  *                 format: password
//  *                 minLength: 8
//  *                 description: At least one number and one letter
//  *             example:
//  *               name: fake name
//  *               email: fake@example.com
//  *               password: password1
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *                $ref: '#/components/schemas/Post'
//  *       "400":
//  *         $ref: '#/components/responses/DuplicateEmail'
//  *       "401":
//  *         $ref: '#/components/responses/Unauthorized'
//  *       "403":
//  *         $ref: '#/components/responses/Forbidden'
//  *       "404":
//  *         $ref: '#/components/responses/NotFound'
//  *
//  *   delete:
//  *     summary: Delete a post
//  *     description: Logged in Posts can delete only themselves. Only admins can delete other Posts.
//  *     tags: [Posts]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Post id
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
