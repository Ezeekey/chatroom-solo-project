const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// START GET

// Getting list of buddies for one user
router.get('/:id', async (req, res) => {     // Expecting {user_id}
    try {
        // Convenient variable to hold query
        const query = 
            'SELECT * FROM ' +
            '(SELECT "buddy"."id", "user_id_2" AS "user_id", "accepted" FROM "user" ' +
            'JOIN "buddy" ON "user_id_1" = "user"."id" WHERE "user"."id" = $1) AS first ' +
            'UNION ALL ' +
            'SELECT "buddy"."id", "user_id_1" AS "user_id", "accepted" FROM "user" ' +
            'JOIN "buddy" ON "user_id_2" = "user"."id" WHERE "user"."id" = $1;';

        const response = await pool.query(query, [req.params.id]);
        // By here, this is a joined table consisting of just ids.

        // Adding names to these ids
        for ( item of response.rows ) {     // Feels dirty, but it works.
            const nameRow = await pool.query('SELECT username FROM "user" WHERE id = $1', [item.user_id]);
            item.username = nameRow.rows[0].username;
        }

        // Send to client
        res.send(response.rows);
    } catch (error) {
        console.log('Get buddy error!', error);
        res.sendStatus(500);
    }
});

// END GET

// START POST

// Sending buddy requests
router.post('/', async (req, res) => {  // Expecting {user_id_1, user_id_2}
    try {
        // First checking if buddy relation already exists
        const buddyRow = await pool.query('SELECT * FROM buddy WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1);', [req.body.user_id_1, req.body.user_id_2]);
        if (buddyRow.rows.length > 0) {
            res.sendStatus(400);
            console.log('Client attempted to friend twice');
            return;
        }
        // Adding request to database
        await pool.query('INSERT INTO buddy (user_id_1, user_id_2) VALUES ($1, $2);', [req.body.user_id_1, req.body.user_id_2]);
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
router.delete('/:id', async (req, res) => {
    try {   // Expecting a query param {user_id} for now
        // Query varibale for ease of use
        const query = 'DELETE FROM buddy WHERE id = $1 AND (user_id_1 = $2 OR user_id_2 = $2);'
        await pool.query(query, [req.params.id, req.query.user_id]);
        // Should be all deleted now, tell client
        res.sendStatus(204);
    } catch (error) {
        console.log('Buddy deletion error!', error);
        res.sendStatus(500);
    }
});

// END DELETE

module.exports = router;
