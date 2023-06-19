const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Starting an httpServer const so that socket.io can work
const httpServer = require('http').createServer(app);

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
