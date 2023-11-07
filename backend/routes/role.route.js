const roleController = require('../controllers/role.controller')
const router = require('express').Router()
const auth=require('../middlewares/auth.middleware')

module.exports=(app)=> {

  router.get("/",auth.authenticateAdmin, roleController.getRoles);

  router.get("/:role",auth.authenticateAdmin, roleController.getcurrentRoleDetail);

  router.post("/",auth.authenticateAdmin,roleController.createRole)

  router.put("/:id",auth.authenticateAdmin, roleController.updateUserRole);

  router.delete("/:id",auth.authenticateAdmin,roleController.deleteRole);

  app.use('/role',router)
}
