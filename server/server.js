const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Starting an httpServer const so that socket.io can work
const httpServer = require('http').createServer(app);

// Actually starting socket.io
const io = require('socket.io')(httpServer, {});

// Importing pool so sockets can make queries to database
const pool = require('./modules/pool.js');

io.on('connection', socket => {
  // Merely testing
  socket.emit('Henlo', 'henlo');

  // Also merely testing
  socket.on('foob', async word => {
    const response = await pool.query('SELECT * FROM "user";');
    socket.emit('give', response.rows);
  })
})

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

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

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
