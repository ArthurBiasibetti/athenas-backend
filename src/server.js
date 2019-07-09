const express = require('express');

const crypto = require('crypto');

const cors = require('cors');

const server = express();

app.use(cors());

server.use(express.json());

server.use(express.urlencoded({ extended:true }))

server.use(require('./routes'));

server.listen(process.env.PORT || 3333);

