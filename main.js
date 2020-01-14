//Test commit
const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');
//const mongoose = require('mongoose');
const config = require('./config/config');
const axios = require('axios')
//This is dumb I need to figure out how I am going to be using the install script to load this 
const VE_config = require(process.env.VE_CONFIG_PATH || '/etc/VibeEngine/VibeEngine.conf')
const logger = require('./plugins/logger');

const app = express();
//This should get configured by the cli
//8080 is the server
//This should also be loaded during the install process
console.log(VE_config)
const port = VE_config.client.api.port;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Will loop through all the endpoints and create their respective routes
config.endpoints.map( (local_app) => {
    app.use(local_app.route, require(local_app.app_path));
});

//Start the rest API
app.listen(port, () => {
    //console.log(VE_config)
    logger.info({label:`main`, message:`Starting client API on port ${port}`});
});


//Attempt to register with the VibeEngine Server
let client_uid;
let test_connection = async () => {
    setTimeout(async () => {
        axios.get(`http://${VE_config.client.server.ip}:${VE_config.client.server.port}/api/connection`)
        .then((resp) => {
            //break?
            console.log(resp.data)
        })
        .catch((err)  => {
            //error doesnt happen
            logger.error({label:`test_connection`, message:`${err}`})
            test_connection()
        })

        
    }, 3000)

}

test_connection()