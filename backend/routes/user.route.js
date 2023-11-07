const mongoose = require("mongoose");
const auth=require('../middlewares/auth.middleware')
module.exports = (app) => {
  var router = require("express").Router();
  const userController = require("../controllers/user.controller");

  router.get("/:searchValue/:page/:itemsPerPage",auth.authenticateAdmin, userController.getUsers);

  router.get("/search/:searchValue/:currentPage/:itemsPerPage",auth.authenticateAdmin, userController.search);

  router.post("/signin", userController.validateUser);

  router.post("/signup", userController.register);

  router.patch("/",auth.authenticateUser,userController.logout)

  router.patch("/:id",auth.authenticateUser,userController.updateRolePermissions);

  app.use("/user", router);

};
