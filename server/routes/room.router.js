const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// START GET

// Getting list of all rooms
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
});

// END GET

// START POST

router.post('/', async (req, res) => {  // Expecting {room_name, type, creator_id}
    try {
        // Convenient pool query variable
        const query =
            'INSERT INTO "chatroom" ("room_name", "type", "creator_id") VALUES ' +
            '($1, \'public\', $2);'
        const response = await pool.query(query, [req.body.room_name, req.body.creator_id]);
        
        // Tell client it's all good
        res.sendStatus(201);
    } catch (error) {
        console.log('Nope, room posting error!', error);
        res.sendStatus(500);
    }
});

// END POST

module.exports = router;
