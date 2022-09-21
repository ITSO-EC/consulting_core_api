const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const categoryRoute = require('./category.route');
const pageRoute = require('./page.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const wsRoute = require('./ws.route');
const defaultRoute = require('./default.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: defaultRoute,
  },
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/pages',
    route: pageRoute,
  },
  {
    path: '/ws',
    route: wsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.use('/', express.static('public'));

/* istanbul ignore next */
// if (config.env === 'development') {
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
// }

module.exports = router;
