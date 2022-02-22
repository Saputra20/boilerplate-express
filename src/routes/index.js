const express = require("express");

const wellcomeRoute = require('../wellcome/wellcome.route');

const router = express.Router();

const routes = [
  {
    path: "/",
    route: wellcomeRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
