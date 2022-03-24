const express = require("express");

const wellcomeRoute = require('../wellcome/wellcome.route');
const hookRoute = require('../hook/hook.route');

const router = express.Router();

const routes = [
  {
    path: "/",
    route: wellcomeRoute,
  },
  {
    path: "/hooks",
    route: hookRoute,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
