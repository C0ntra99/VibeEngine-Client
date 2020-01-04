class Score_helper{
    get_score(callback){
        let current_time = new Date()
        return callback({status:200, message:{
            score:Math.floor(Math.random() * 100),
            time:current_time.getTime() 
        }})
    }
}

module.exports = Score_helper;