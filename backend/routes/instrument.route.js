const roleController = require('../controllers/instrument.controller')
const router = require('express').Router()
const auth=require('../middlewares/auth.middleware')

module.exports=(app)=> {

  router.get("/:searchValue",auth.authenticateUser,roleController.searchInstrument)

  router.post("/",auth.authenticateAdmin,roleController.createInstrument)

  router.put("/:id",auth.authenticateAdmin,roleController.updateInstrument)

  router.delete("/:id",auth.authenticateAdmin,roleController.deleteInstrument)

  router.get("/",auth.authenticateUser, roleController.getInstruments);

  app.use('/instrument',router)
}
