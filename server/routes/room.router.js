const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware.js');

// START GET

// Getting list of all rooms
router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        // Convenient variable for longish query
        const query =
            'SELECT "chatroom"."id", "room_name", "username", "type" FROM "chatroom" ' +
            'JOIN "user" ON "user"."id" = "creator_id" WHERE type=\'public\';'
        const response = await pool.query(query);
        // Send to client
        res.send(response.rows);
    } catch (error) {
        res.sendStatus(500);
        console.log('Getting rooms error!', error);
    }
});

// Getting the name of a room, I don't like
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Getting name from the database using id
        const response = await pool.query('SELECT room_name FROM chatroom WHERE id = $1', [req.params.id]);
        // Giving just the name to the client
        res.send(response.rows[0]);
    } catch (error) {

    }
});

// END GET

// START POST

router.post('/', rejectUnauthenticated, async (req, res) => {  // Expecting {room_name, type}
    try {
        // Convenient pool query variable
        const query =
            'INSERT INTO "chatroom" ("room_name", "type", "creator_id") VALUES ' +
            '($1, $2, $3);'
        const response = await pool.query(query, [req.body.room_name, req.body.type, req.user.id]);

        // Tell client it's all good
        res.sendStatus(201);
    } catch (error) {
        console.log('Nope, room posting error!', error);
        res.sendStatus(500);
    }
});

// END POST

// START DELETE

router.delete('/:id', rejectUnauthenticated, async (req, res) => {    // id param is room_id
    try {
        // Convenient query text variable
        const query =
            'DELETE FROM "chatroom" WHERE "creator_id" = $1 AND "id" = $2;';
        pool.query(query, [req.user.id, req.params.id]);

        // Send success to client
        res.sendStatus(204);
    } catch (error) {
        console.log('Room deletion error!', error);
        res.sendStatus(500);
    }
});

// END DELETE

module.exports = router;
