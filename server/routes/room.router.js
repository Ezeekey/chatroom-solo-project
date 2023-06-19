const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// START GET

router.get('/', async (req, res) => {
    res.send('Hi');
})

// END GET

module.exports = router;
