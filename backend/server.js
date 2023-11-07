const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

// Enable CORS for all origins
app.use(cors({
    origin: '*',
    credentials: true,
  }));

app.use(bodyParser.json());

// config !
require('./config/db.config')


// Routes
;
const userRoute=require('./routes/user.route')(app);
const roleRoute = require('./routes/role.route')(app);
const instrumentRoute = require('./routes/instrument.route')(app);

// Middleware

app.listen(port,()=>{
    console.log(`Server running in ${port}`);
})
module.exports = app;
