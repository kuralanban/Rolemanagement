const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.instruments = require("./instrument.model")(mongoose);
db.users = require("./user.model")(mongoose)
db.roleManagement=require('./role.model')(mongoose)
module.exports = db;
