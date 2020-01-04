const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');
//const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./plugins/logger')

const app = express();
//This should get configured by the cli
//8080 is the server
const port = process.env.PORT || 8081;

//Doest not need a database
/*
this.db_base=config.globals.mongodb;
this.mongo_url=`${this.db_base}?retryWrites=true`

mongoose.connect(
    this.mongo_url,
    { useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.set('useFindAndModify', false);
this.db = mongoose.connection;
this.db.once("open", () => {
    logger.info({label: `dbConnection`, message:"connected to the database"});
});

this.db.on("error", (err) => {
    logger.error({label:`dbConnection`, message: `MongoDB connection error: ${err}`});
});
*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Will loop through all the endpoints and create their respective routes
config.endpoints.map( (local_app) => {
    app.use(local_app.route, require(local_app.app_path));
});

//Start the rest API
app.listen(port, () => {
    logger.info({label:`main`, message:`Starting client API on port ${port}`});
});