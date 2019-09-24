const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const server = express();
const authRouter = require('../auth/auth-router.js');
const db = require('../data/dbConfig.js');
const connectSessionKnex = require('connect-session-knex');
const party = require('../parties/parties-model.js');

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: 'cookie for project',
  // THIS SHOULD NOT BE HARD CODED IN
  secret: 'Just making cookies!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true // the cant access via js
  },
  resave: false,
  saveUninitialized: false,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api/auth', authRouter);
server.use('/api/', party);

server.get('/', (req, res) => {
  res.send('Creating the Login Database');
})


module.exports = server;