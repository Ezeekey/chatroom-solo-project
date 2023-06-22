const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Starting an httpServer const so that socket.io can work
const httpServer = require('http').createServer(app);

// Importing pool so sockets can make queries to database
const pool = require('./modules/pool.js');

// Cookies and authentication
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Actually starting socket.io
const io = require('socket.io')(httpServer, {});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', socket => {
  const joinedRooms = [];   // This is for some filthy filthy hackery to store rooms for down below

  console.log('Websocket connect');
  // Convenient variable to hold the user id from the browser cookie.
  // Cuts down on verbosity
  const userId = socket.request.session.passport.user;

  // Quickly allows authentication of sockets
  function auth() {
    if (userId !== undefined) {
      return true;
    } else {
      console.log('very bad');
      return false;
    }
  }
  

  // Joining a room
  socket.on('JOIN_ROOM', room => {  // Expecting room id
    if(!auth()) {
      console.log('Unauthorized socket attempted to join');
      // Hopefully quits the room
      return;
    }

    console.log(room, 'has been joined by', userId);

    // Filthy filthy hackery to leave all other rooms before joining
    for (let i = 0; i < joinedRooms.length; i++) {
      console.log(socket.request.session.passport.user);

      socket.leave(joinedRooms[i]);
    }

    socket.join(String(room));
    joinedRooms.push(room);
  });

  // Getting messages from a room
  socket.on('GET_MESSAGES', async room => {   // Expecting just a single room id for now
    if(!auth()) {
      console.log('Unauthorized socket attempted to get messages');
      // Hopefully quits the room
      return;
    }

    try {
      // Convenient variable for long pool query
      const query =
        'SELECT "message"."id", "user_id", "username", "content", "time_posted", "marked_for_delete" FROM "message" ' +
        'JOIN "user" ON "user_id" = "user"."id"' +
        'WHERE "room_id" = $1 ' +
        'ORDER BY "time_posted";';

      const response = await pool.query(query, [room]);

      // Send back to client
      socket.emit('GIVE_MESSAGES', response.rows);
    } catch (error) {
      console.log('Getting message error', error);
    }
  });

  // Posting messages
  socket.on('POST_MESSAGE', async body => {   // Expecting {user_id, room_id, content}
    try {
      // Convienient variable for longish query
      const query =
        'INSERT INTO "message" ("user_id", "room_id", "content") ' +
        'VALUES ($1, $2, $3);';

      // Contact database to insert message
      const response = await pool.query(query, [body.user_id, body.room_id, body.content]);

      // Sending successful add to everybody in the room
      socket.to(body.room_id).emit('MESSAGE_SUCCESS', 'yay');
      socket.emit('MESSAGE_SUCCESS', 'yay');
    } catch (error) {
      console.log('Oh no message post errror!', error);
    }
  });

  // Editing messages
  socket.on('EDIT_MESSAGE', async body => {   // Expecting {user_id, message_id, content, room_id}
    if(!auth()) {
      console.log('Unauthorized socket attempted to edit messages');
      // Hopefully quits the room
      return;
    }
    try {
      // Modifying the content from body to show that it has been edited
      const editedContent = body.content + ' (edited)';

      // Convenient query variable
      const query =
        'UPDATE "message" SET "content" = $1 ' +
        'WHERE "message"."id" = $2 AND "user_id" = $3 AND "marked_for_delete" = FALSE;';

      // Contact the database to try and update message
      const response = await pool.query(query, [editedContent, body.message_id, body.user_id]);

      // Sending successful add to everybody in the room
      socket.to(body.room_id).emit('MESSAGE_SUCCESS', 'yay');
      socket.emit('MESSAGE_SUCCESS', 'yay');
    } catch (error) {
      console.log('Big message edit error!', error);
    }
  });

  // Deleting messages
  socket.on('DELETE_MESSAGE', async body => { // Expecting {user_id, message_id, room_id}
    if(!auth()) {
      console.log('Unauthorized socket attempted to delete messages');
      // Hopefully quits the room
      return;
    }
    try {
      // Get user privilege from the database to prevent any shady actors from deleting everything
      const userPrivilege = await pool.query('SELECT "privilege" FROM "user" WHERE "id" = $1;', [body.user_id]);
      // Remember to use userPrivilege.rows[0].privilege when calling

      // Regular users can not truly delete messages. Only admins will have that power
      let query = '';
      const queryArgs = [];

      // Checking if user is an admin
      if (userPrivilege.rows[0].privilege > 0) {
        // User is an admin
        query = 'DELETE FROM "message" WHERE "message"."id" = $1';
        queryArgs.push(body.message_id);
      } else {
        // User is just a regular user
        query =
          'UPDATE "message" SET ' +
          '"content" = \'deleted by user\', ' +
          '"marked_for_delete" = true ' +
          'WHERE "id" = $1 AND "user_id" = $2;';
        queryArgs.push(body.message_id, body.user_id);
      }

      // By here, the query has been figured out
      const response = await pool.query(query, queryArgs);
      // Sending successful add to everybody in the room
      socket.to(body.room_id).emit('MESSAGE_SUCCESS', 'yay');
      socket.emit('MESSAGE_SUCCESS', 'yay');
    } catch (error) {
      console.log('Big delete error!', error);
    }
  })
});


// Route includes
const userRouter = require('./routes/user.router');
const roomRouter = require('./routes/room.router.js');
const buddyRouter = require('./routes/buddy.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/buddy', buddyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
