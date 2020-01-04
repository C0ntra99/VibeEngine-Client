const express = require('express');
const router = express.Router();
const Score_helper = require('../helpers/Score_helper')

var helper = new Score_helper();

router.get('/', (req, res) => {
    helper.get_score((result) => {
        return res.json(result)
    })
})

module.exports = router;