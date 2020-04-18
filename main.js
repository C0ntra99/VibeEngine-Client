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


//test the connection to the server
//this should always be running, if it fails then something went wrong with everything and broke some shit
let test_connection = async (callback) => {
    setTimeout(async () => {
        axios.get(`http://${VE_config.client.server.ip}:${VE_config.client.server.port}/api/connection`)
        .then((resp) => {
            //break?
            if(resp.data.status == 200) {
                callback(resp.data)
            }
        })
        .catch((err)  => {
            //error doesnt happen
            logger.error({label:`test_connection`, message:`${err}`})
            test_connection((callback))
        })
        
    }, 3000)
}


let main = async () => {
    //This is such a weird way to do it but I guess it works :///
    let connection_status = await test_connection()
    console.log(connection_status)

    test_connection((data) => {
        //UIDD is going to be somewhere in the data, just gotta find it
        //console.log(data)
    })
}

main()