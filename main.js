const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');
//const mongoose = require('mongoose');
const config = require('./config/config');
const VE_config = require(process.env.VE_CONFIG_PATH || '/opt/VibeEngine/VibeEngine')
const logger = require('./plugins/logger');

const app = express();
//This should get configured by the cli
//8080 is the server
//Read the config that was created by the cli
const port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Will loop through all the endpoints and create their respective routes
config.endpoints.map( (local_app) => {
    app.use(local_app.route, require(local_app.app_path));
});

//Attempt to register with the VibeEngine Server

//Start the rest API
app.listen(port, () => {
    console.log(VE_config)
    logger.info({label:`main`, message:`Starting client API on port ${port}`});
});