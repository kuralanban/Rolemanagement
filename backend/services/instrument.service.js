const db = require("../models");
const Role = db.roleManagement;
const Instrument=db.instruments;
  module.exports = {
    createInstrumentService: async (body) => {
      try {
        const instrumentSchema={
            ComputerHostName:body.ComputerHostName,
            instrumentName:body.InstrumentName,
            ApplicationName:body.ApplicationName,
            instrumentLocation:body.Location
        }

        const createInstrument=await Instrument.create(instrumentSchema);
        const updateSchema=await Instrument.findOne({instrumentName:body.InstrumentName})
        const update = {
          $push: {
            "instrumentPermissions": {instrument_id:updateSchema._id,instrumentName:updateSchema.instrumentName,permissionStatus:false}
          }
        };
        const updateRole=await Role.updateMany({}, update)
        if(createInstrument){
          return createInstrument
        }
      } catch (error) {
        return error.msg;
      }
    },

    updateInstrumentService: async (body,params) => {
      try {
        const instrumentSchema={
          ComputerHostName:body.ComputerHostName,
          instrumentName:body.InstrumentName,
          ApplicationName:body.ApplicationName,
          instrumentLocation:body.Location
      }
        const createInstrument=await Instrument.findOneAndUpdate({_id:params},instrumentSchema, { new: true } );
        if(createInstrument){
          return createInstrument
        }
      } catch (error) {
        return error.msg;
      }
    },
    deleteInstrumentService: async (params) => {
      try {
        const instrument=await Instrument.findOneAndDelete({_id:params});
        const update = {
          $pull: {
            "instrumentPermissions": {
              instrumentName: instrument.instrumentName
            }
          }
        };

        // Update all roles to remove the instrument permissions
        const updateRole = await Role.updateMany({}, update);

        if(instrument){
          return instrument
        }
      } catch (error) {
        return error.msg;
      }
    },
    searchInstrument: async (instrumentName) => {
      try{
        const users=await Instrument.find({
          instrumentName:{$regex:`^${instrumentName}`,$options:'i'},
       })
         return users
       }
       catch (error) {
         return error.message
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
  
  }
