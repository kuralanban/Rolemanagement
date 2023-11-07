const db = require("../models/index");
const User = db.users;
const Role = db.roleManagement;
const Instrument = db.instruments;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
module.exports = {
  registerUser: async data => {
    try {
      const userShema = {
        userEmail: data.email,
        userPassword: data.password,
        userRole: data.role,
        userName: data.username,
        isActive: false
      };
      const registerUser = await User.create(userShema);
      return registerUser;
    } catch (error) {
      return error.msg;
    }
  },
  validateUser: async data => {
    try {
      const user = await User.findOne({ userEmail: data.email });
      const password = user.userPassword;

      if (
        user &&
        data.email == user.userEmail &&
        data.password == user.userPassword
      ) {
        var token = jwt.sign(
          {
            email: user.userEmail,
            role: user.userRole,
            userName: user.userName
          },
          `wsdne32uejdnmwemdmswje2mw`
        );
        const updateStatus = await User.findOneAndUpdate(
          { userEmail: data.email },
          {
            $set: {
              isActive: true
            }
          },
          { new: true }
        );

        return token;
      } else {
        return "Invalid Credetials !";
      }
    } catch (error) {
      return error.msg;
    }
  },

  getallUsers: async (searchValue,page, itemsPerPage) => {
    try {
      if(searchValue=='empty'){
        const limitData=JSON.parse(itemsPerPage)
        const pageNo=JSON.parse(page)
        const skipCount = (pageNo - 1) * limitData; // Calculate how many items to skip
        const users = await User.find({}).skip(skipCount).limit(limitData);
          return users;
      }
      else{
        const limitData=JSON.parse(itemsPerPage)+1
        const searchedUsers = await User.find({
          userName: { $regex: `^${searchValue}`, $options: "i" }
        }).limit(limitData);
        return searchedUsers
      }
    } catch (error) {
      return error.message;
    }
  },
  searchValue: async (username,currentPage,itemsPerPage) => {
    try {
      const users = await User.find({
        userName: { $regex: `^${username}`, $options: "i" }
      }).limit(itemsPerPage+1);;
      return users;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return error.message;
    }
  },
  updateRole: async (data, params) => {
    try {
      const updatedData = await User.findOneAndUpdate(
        { _id: params },
        {userRole:data.role}
      );
      if (updatedData) {
        return updatedData;
      }
    } catch (error) {
      return error.msg;
    }
  },

  updateActionPermission: async (data, params) => {
    try {
      const updatedData = await User.findOneAndUpdate(
        { _id: params },
        { actionPermissions: data }
      );
      if (updatedData) {
        return updatedData;
      }
    } catch (error) {
      return error.msg;
    }
  },


  getInstruments: async () => {
    try {
      const updatedData = await Instrument.find({});
      if (updatedData) {
        return updatedData;
      }
    } catch (error) {
      return error.msg;
    }
  },
  logoutUser: async data => {
    try {

      const updateStatus = await User.findOneAndUpdate(
        { userEmail: data.email },
        {
          $set: {
            isActive: false
          }
        },
        { new: true }
      );
      if (updateStatus) {
        return updateStatus;
      }
    } catch (error) {
      return error.msg;
    }
  },
  // fetchingcurrentRoleDetail: async roleName => {
  //   try {
  //     const roleDetails = await Role.aggregate([
  //       {
  //         $match: { role: roleName } // Match the role by name
  //       },
  //       {
  //         $unwind: "$instrumentPermissions" // Unwind the instrumentPermissions array
  //       },
  //       // {
  //       //   $match: { "instrumentPermissions.permissionStatus": true } // Match only objects with permissionStatus as true
  //       // },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           role: { $first: "$role" },
  //           instrumentPermissions: { $push: "$instrumentPermissions" }
  //         }
  //       }
  //     ]).exec();

  //     if (roleDetails.length > 0) {
  //       return roleDetails[0];
  //     } else {
  //       return null; // Return null or another appropriate value
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return error.message;
  //   }
  // }
};
