'use strict'
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http'); 
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

// Mongoose setup 
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(
    'mongodb+srv://brunotdantas:FwH9wgRL0RU32zT4@cluster0-p9srt.gcp.mongodb.net/week10?retryWrites=true&w=majority'
    ,{ useNewUrlParser: true }
    );
 

setupWebsocket(server);

// Habilitar acesso externo a API 
app.use(cors());

// Server setup 
app.use(express.json()); // habilita Json no express
app.use(routes);
server.listen(3333); // listen conenctions 
