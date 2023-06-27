const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware.js');


async function getBuddies(user_id) {
    try {
        // Convenient variable to hold query
        const query =
            'SELECT * FROM ' +
            '(SELECT "buddy"."id", "user_id_2" AS "user_id", "accepted" FROM "user" ' +
            'JOIN "buddy" ON "user_id_1" = "user"."id" WHERE "user"."id" = $1) AS first ' +
            'UNION ALL ' +
            'SELECT "buddy"."id", "user_id_1" AS "user_id", "accepted" FROM "user" ' +
            'JOIN "buddy" ON "user_id_2" = "user"."id" WHERE "user"."id" = $1;';

        const response = await pool.query(query, [user_id]);
        // By here, this is a joined table consisting of just ids.

        // Adding names to these ids
        for (item of response.rows) {     // Feels dirty, but it works.
            const nameRow = await pool.query('SELECT username, status FROM "user" WHERE id = $1', [item.user_id]);
            item.username = nameRow.rows[0].username;
            item.status = nameRow.rows[0].status;
        }

        // Send to client
        return response.rows;
    } catch (error) {
        console.log('Get buddy error!', error);
        return 1;
    }
}


// START GET

// Getting list of buddies for one user
router.get('/', rejectUnauthenticated, async (req, res) => {
    const rows = await getBuddies(req.user.id);

    if(rows !== 1) {
        // Success
        res.send(rows);
    } else {
        // Bad
        res.sendStatus(500);
    }
});

// Getting buddy invites
router.get('/invites', rejectUnauthenticated, async (req, res) => {
    try {
        // Variable to store the query text, because it will be longish
        const query = 'SELECT username, buddy.id FROM buddy JOIN "user" ON user_id_1 = "user".id WHERE user_id_2 = $1 AND accepted = false';
        // Contacting database to get buddy invites
        const response = await pool.query(query, [req.user.id]);
        res.send(response.rows);
    } catch (error) {
        console.log('Invite send error!', error);
        res.sendStatus(500);
    }
});

// Finding invitable buddies to a room
router.get('/invitee', rejectUnauthenticated, async (req, res) => {
    try {
        // This query checks for any buddies to invite that are already not in the room
        const query = 
            'SELECT "user".id, username FROM ';
    } catch (error) {
        console.log('Getting invitable buddies error!', error);
        res.sendStatus(500);
    }
});

// END GET

// START POST

// Sending buddy requests
router.post('/', rejectUnauthenticated, async (req, res) => {  // Expecting { user_id_2}
    try {
        // First checking if buddy relation already exists
        const buddyRow = await pool.query('SELECT * FROM buddy WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1);', [req.user.id, req.body.user_id_2]);
        if (buddyRow.rows.length > 0) {
            res.sendStatus(400);
            console.log('Client attempted to friend twice');
            return;
        }
        // Adding request to database
        await pool.query('INSERT INTO buddy (user_id_1, user_id_2) VALUES ($1, $2);', [req.user.id, req.body.user_id_2]);
        // Request went in good
        res.sendStatus(201);
    } catch (error) {
        console.log('Buddy post error!', error);
        res.sendStatus(500);
    }
});

// END POST

// START DELETE

// Deleting a buddy
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    try {   // Expecting a query param {user_id} for now
        // Query varibale for ease of use
        const query = 'DELETE FROM buddy WHERE id = $1 AND (user_id_1 = $2 OR user_id_2 = $2);'
        await pool.query(query, [req.params.id, req.user.id]);
        // Should be all deleted now, tell client
        res.sendStatus(204);
    } catch (error) {
        console.log('Buddy deletion error!', error);
        res.sendStatus(500);
    }
});

// END DELETE

// START PUT

// Accepting buddy requests
router.put('/invite/:id', rejectUnauthenticated, async (req, res) => {
    try {
        // Query only allows changes if the user themself are accepting it
        const query = 'UPDATE buddy SET accepted = true WHERE id = $1 AND user_id_2 = $2';
        // Contact pool to change buddy acceptance to true
        await pool.query(query, [req.params.id, req.user.id]);

        res.sendStatus(200);
    } catch (error) {
        console.log('Big accept invite error!', error);
    }
});

// END PUT

module.exports = router;
