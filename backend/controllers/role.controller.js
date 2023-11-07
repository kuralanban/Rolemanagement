const roleService=require('../services/role.service')

exports.deleteRole = async (req, res, next) => {
  try {
    const params=req.params.id;
    const updatedRoledata=await roleService.deleteRoleService(params);

    if(updatedRoledata) {
      res.status(200).send({
        message: "Role deleted Successfully ",
        data:updatedRoledata
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.createRole = async (req, res, next) => {
  try {
    const data=req.body;

    const updatedRoledata=await roleService.createRoleService(data);


    if(updatedRoledata) {
      res.status(200).send({
        message: "Role created Successfully",
        data:updatedRoledata
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};



exports.updateUserRole = async (req, res, next) => {
  try {
    const data=req.body;
    const params=req.params.id;
    const updatedData=await roleService.updateRole(data,params);
   if(updatedData){
      res.status(200).send({
        message: "role updated ",
        data:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};

exports.getRoles= async (req, res, next) => {
  try {
    const updatedData=await roleService.getRoles();
   if(updatedData){
      res.status(200).send({
        message: "Role fetched Successfully ",
        data:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
exports.getcurrentRoleDetail= async (req, res, next) => {
  try {
    const params=req.params.role;
    const updatedData=await roleService.fetchingcurrentRoleDetail(params);
   if(updatedData){
      res.status(200).send({
        message: "Successfully Fetched current role ",
        data:updatedData
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching users."
    });
  }
};
