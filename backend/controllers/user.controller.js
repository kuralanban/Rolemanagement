const userService=require('../services/user.service')

exports.validateUser = async (req, res, next) => {
  try {
    const data=req.body;
    const verifiedUserData=await userService.validateUser(data);
    if(verifiedUserData=='Invalid Credetials !'){
        res.status(400).send({
          message: "Invalid ",
          data:"Invalid Credetials !"
        });
      }
    else {
      res.status(200).send({
        message: "Login Success ",
        userData:verifiedUserData
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const page = req.params.page
    const itemsPerPage = req.params.itemsPerPage
    const searchValue =req.params.searchValue;
    const users=await userService.getallUsers(searchValue,page,itemsPerPage);
   if(users){
      res.status(200).send({
        message: "Fetched users ",
        userDetails:users
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
exports.search = async (req, res, next) => {
  try {

    const searchValue=req.params.searchValue;
    const currentPage=req.params.currentPage;
    const itemsPerPage=req.params.itemsPerPage;
    const updatedData=await userService.searchValue(searchValue,currentPage,itemsPerPage);
   if(updatedData){
      res.status(200).send({
        message: "searched user result  ",
        updatedData:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
exports.updateRolePermissions= async (req, res, next) => {
  try {
    const roleForm=req.body;
    const params=req.params.id;

    const updatedData=await userService.updateRole(roleForm,params);
   if(updatedData){
      res.status(200).send({
        message: "Permissions Updated Successfully ",
        updatedData:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
exports.register= async (req, res, next) => {
  try {
    const data=req.body;

    const updatedData=await userService.registerUser(data);
   if(updatedData){
      res.status(200).send({
        message: "User Registered Successfully ",
        updatedData:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};

exports.getInstruments= async (req, res, next) => {
  try {

    const updatedData=await userService.getInstruments();
   if(updatedData){
      res.status(200).send({
        message: "Successfully Fetched all Instruments ",
        data:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
exports.logout= async (req, res, next) => {
  try {

    const updatedData=await userService.logoutUser(req.body);
   if(updatedData){
      res.status(200).send({
        message: "Successfully logged out ",
        data:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};

