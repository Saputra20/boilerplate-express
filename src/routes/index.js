const express = require("express");
const config = require('../config/config');

const queueRoute = require('../queue/queue.route');
const wellcomeRoute = require('../wellcome/wellcome.route');

const router = express.Router();

const routes = [
  {
    path: "/",
    route: wellcomeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/queue-monitor',
    route: queueRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
