const config={
    "endpoints":[ 
        {
            "name":"Score",
            "route":"/api/score",
            "app_path":"./routes/api/score"
        }
    ],
    "globals":{
        "logging":{
            "path":"./logs",
            "level":"debug",
            "maxSize":"5m",
            "maxFiles":"100"
        }
    }
}

module.exports = config;