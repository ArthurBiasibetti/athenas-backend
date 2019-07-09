const express = require('express');

const crypto = require('crypto');

const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.json());

server.use(express.urlencoded({ extended:true }))

server.use(require('./routes'));

const porta = process.env.PORT || 3333;

server.listen(porta);

