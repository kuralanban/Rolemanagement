const db = require("../models");
const Role = db.roleManagement;
const Instrument=db.instruments;
const User=db.users;
  module.exports = {
    deleteRoleService: async (params) => {
      try {

        const deletRole=await Role.findOneAndDelete({_id:params});
        if(deletRole){
          return deletRole
        }
      } catch (error) {
        return error.msg;
      }
    },
    createRoleService: async (data) => {
      try {
        const createdRole=await Role.create(data);
        if(createdRole){
          return createdRole
        }
      } catch (error) {
        return error.msg;
      }
    },
    updateUserRole: async (data, params) => {
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
    updateRole: async (data, params) => {
      try {
        const updatedData = await Role.findOneAndUpdate(
          { _id: params },
          {
            role: data.role,
            instrumentPermissions: data.instrumentPermissions
          }
        );
        return updatedData;
      } catch (error) {
        return error.msg;
      }
    },
    getRoles: async () => {
      try {
        const rolesWithCount = await Role.aggregate([
          {
            $group: {
              _id: "$_id", // Use _id as the unique identifier for the role
              role: { $first: "$role" }, // Get the role name
              count: { $sum: 1 }
            }
          }
        ]);
        const usersWithRole = await User.aggregate([
          {
            $group: {
              _id: "$userRole",
              count: { $sum: 1 }
            }
          }
        ]);
        const result = rolesWithCount.map(roleCount => {
          const userCount = usersWithRole.find(
            userRoleCount => userRoleCount._id == roleCount.role
          );
          return {
            _id: roleCount._id,
            role: roleCount.role,
            count: userCount ? userCount.count : 0
          };
        });
        return result;
      } catch (error) {
        return error.message;
      }



    },
    fetchingcurrentRoleDetail: async roleName => {
      try {
        const roleDetails = await Role.aggregate([
          {
            $match: { role: roleName } // Match the role by name
          },
          {
            $unwind: "$instrumentPermissions" // Unwind the instrumentPermissions array
          },
          // {
          //   $match: { "instrumentPermissions.permissionStatus": true } // Match only objects with permissionStatus as true
          // },
          {
            $group: {
              _id: "$_id",
              role: { $first: "$role" },
              instrumentPermissions: { $push: "$instrumentPermissions" }
            }
          }
        ]).exec();

        if (roleDetails.length > 0) {
          return roleDetails[0];
        } else {
          return null; // Return null or another appropriate value
        }
      } catch (error) {
        console.error("Error:", error);
        return error.message;
      }
    }
  };
