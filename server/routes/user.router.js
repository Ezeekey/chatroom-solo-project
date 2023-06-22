const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    // Contact the database to get single user with no password
    const response = await pool.query('SELECT id, username, privilege, status FROM "user" WHERE id=$1', [req.params.id]);
    // Put response into object so it may be slightly modified
    const selectedUser = response.rows[0];
    // Checking friend status
    const queryText = 'SELECT * FROM buddy WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1);'
    const friendStatus = await pool.query(queryText, [req.user.id, req.params.id]);
    
    if (friendStatus.rows.length > 0) {
      selectedUser.isBuddy = true;
      selectedUser.buddy_id = friendStatus.rows[0].id;
    } else {
      selectedUser.isBuddy = false;
    }
    // Send back user to client
    res.send(selectedUser);
  } catch (error) {
    console.log('Single user get ERROR!', error);
    res.sendStatus(500);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
