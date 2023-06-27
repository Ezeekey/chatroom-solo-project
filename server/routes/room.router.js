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
            'JOIN "user" ON "user"."id" = "creator_id" ' + 
            'WHERE type=\'public\' ' +
            'UNION ALL ' +
            'SELECT chatroom.id, room_name, username, type FROM chatroom JOIN "user" ON "user".id = creator_id ' +
            'JOIN room_member ON chatroom.id = room_id AND type = \'private\' ' +
            'WHERE user_id = $1 OR $2 > 1 ORDER BY type;';
        const response = await pool.query(query, [req.user.id, req.user.privilege]);
        // Send to client
        res.send(response.rows);
    } catch (error) {
        res.sendStatus(500);
        console.log('Getting rooms error!', error);
    }
});

// Getting room membership
router.get('/membership/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Convenient variable to hold query
        const query =
            'SELECT room_member.id FROM room_member ' +
            'JOIN "user" ON "user".id = user_id ' +
            'JOIN chatroom ON chatroom.id = room_id ' +
            'WHERE user_id = $1 AND room_id = $2;';

        // Contact database to get at least one row
        const response = await pool.query(query, [req.user.id, req.params.id]);

        // Send the row to the client
        res.send(response.rows);
    } catch (error) {
        console.log('Room member get error!', error);
        res.sendStatus(500);
    }
})

// Getting the name of a room and creator_id, I don't like
router.get('/details/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Getting name from the database using id
        const response = await pool.query('SELECT room_name, creator_id, type FROM chatroom WHERE id = $1', [req.params.id]);
        // Giving just the name to the client
        res.send(response.rows[0]);
    } catch (error) {
        console.log('Room info get error!', error);
        res.sendStatus(500);
    }
});

// Getting list of invitations
router.get('/invite', rejectUnauthenticated, async (req,res) => {
    try {
        // Get list of invites for specific user from database, then send to client
        const query = 
            'SELECT room_invite.id, room_id, username, room_name FROM room_invite ' +
            'JOIN chatroom ON room_id = chatroom.id ' +
            'JOIN "user" ON inviter_id = "user".id ' +
            'WHERE invitee_id = $1';
        const response = await pool.query(query, [req.user.id]);
        res.send(response.rows);
    } catch (error) {
        console.log('Invite get error!', error);
        res.sendStatus(500);
    }
});

// END GET

// START POST

// Creating a new chat room
router.post('/', rejectUnauthenticated, async (req, res) => {  // Expecting {room_name, type}
    try {
        // Start transaction
        await pool.query('BEGIN;');
        // Convenient pool query variable
        const query =
            'INSERT INTO "chatroom" ("room_name", "type", "creator_id") VALUES ' +
            '($1, $2, $3) RETURNING *;'
        const response = await pool.query(query, [req.body.room_name, req.body.type, req.user.id]);

        // Create a room_member relation
        await pool.query('INSERT INTO room_member (user_id, room_id) VALUES ($1, $2);', [req.user.id, response.rows[0].id]);
        // end transaction
        await pool.query('COMMIT;');
        // Tell client it's all good
        res.sendStatus(201);
    } catch (error) {
        console.log('Nope, room posting error!', error);
        res.sendStatus(500);
    }
});

// Adding a new membership
router.post('/membership', rejectUnauthenticated, async (req, res) => {     // Expecting room_id
    try {
        // Checking that user is already a member first, then checking if the function should go forward
        const existanceResponse = await pool.query('SELECT * FROM room_member WHERE user_id = $1 AND room_id = $2', [req.user.id, req.body.room_id]);

        if (existanceResponse.rows > 0) {
            // Membership already exists. Quit
            res.sendStatus(400);
            return;
        }

        // By here, this is a good request

        // Contacting pool to create new room_member entry, than sending a code back to the client
        await pool.query('INSERT INTO room_member (user_id, room_id) VALUES ($1, $2);', [req.user.id, req.body.room_id]);
        res.sendStatus(201);
    } catch (error) {
        console.log('Membership post error!', error);
        res.sendStatus(500);
    }
});

// Inviting other users to rooms
router.post('/invite', rejectUnauthenticated, async (req, res) => { // Expecting {invitee_id, room_id}
    try {
        // Create new invite row, then send success code to client
        await pool.query('INSERT INTO room_invite (inviter_id, invitee_id, room_id) VALUES ($1,$2,$3);', [req.user.id, req.body.invitee_id, req.body.room_id]);
        res.sendStatus(201)
    } catch (error) {
        console.log('Invite send error!', error);
    }
});

// END POST

// START DELETE

// Deleting chat rooms
router.delete('/:id', rejectUnauthenticated, async (req, res) => {    // id param is room_id
    try {
        // Convenient query text variable
        // Checking user privilege allows admins to delete rooms that they don't own
        const query =
            'DELETE FROM "chatroom" WHERE ("creator_id" = $1 OR $3 > 0) AND "id" = $2;';
        pool.query(query, [req.user.id, req.params.id, req.user.privilege]);

        // Send success to client
        res.sendStatus(204);
    } catch (error) {
        console.log('Room deletion error!', error);
        res.sendStatus(500);
    }
});

// Deleting memberships
router.delete('/membership/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Contact database to delete membership row, then tell client that operation was successful
        await pool.query('DELETE FROM room_member WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
        res.sendStatus(204);
    } catch (error) {
        console.log('Membership delete error!', error);
        res.sendStatus(500);
    }
});

// Deleting invites
router.delete('/invite/:id', rejectUnauthenticated, async (req, res) => { // Param is invite id
    try {
        // Create new invite row, then send success code to client
        await pool.query('DELETE FROM room_invite WHERE id=$1 AND invitee_id = $2;', [req.params.id, req.user.id]);
        res.sendStatus(204);
    } catch (error) {
        console.log('Invite delete error!', error);
    }
});


// END DELETE

module.exports = router;
