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
})

// END GET

module.exports = router;
