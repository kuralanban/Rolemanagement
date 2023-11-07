const instrumentService=require('../services/instrument.service');

exports.createInstrument = async (req, res, next) => {
  try {
    const body=req.body;
    const updatedRoledata=await instrumentService.createInstrumentService(body);

    if(updatedRoledata) {
      res.status(200).send({
        message: "Instrument created successfully ",
        data:updatedRoledata
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.searchInstrument = async (req, res, next) => {
  try {
    const body=req.body;
    const updatedRoledata=await instrumentService.searchInstrument(body);

    if(updatedRoledata) {
      res.status(200).send({
        message: "Fetached Instruments  successfully",
        data:updatedRoledata
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.updateInstrument = async (req, res, next) => {
  try {
    const body=req.body;
    const params=req.params.id;
    const updatedInstrument=await instrumentService.updateInstrumentService(body,params);

    if(updatedInstrument) {
      res.status(200).send({
        message: "Instrument Updated  ",
        data:updatedInstrument
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.deleteInstrument = async (req, res, next) => {
  try {
    const params=req.params.id;
    const deletedInstrument=await instrumentService.deleteInstrumentService(params);

    if(deletedInstrument) {
      res.status(200).send({
        message: "Instrument deleted ",
        data:deletedInstrument
      });
    }

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding new address."
    });
  }
};
exports.getInstruments= async (req, res, next) => {
  try {

    const updatedData=await instrumentService.getInstruments();
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
