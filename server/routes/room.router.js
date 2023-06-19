const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// START GET

router.get('/', async (req, res) => {
    try {
        // Convinient variable for longish query
        const query = 
            'SELECT "chatroom"."id", "room_name", "username" FROM "chatroom" ' +
            'JOIN "user" ON "user"."id" = "creator_id";' 
        const response = await pool.query(query);
        // Send to client
        res.send(response.rows);
    } catch (error) {
        res.sendStatus(500);
        console.log('Getting rooms error!', error);
    }
})

// END GET

module.exports = router;
