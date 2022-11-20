const express = require("express");
const server = express();

server.use(express.json());

const accountsRouter = require('./accounts/accounts-router')


server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.status(200).json({api: "up"})
  });
  

module.exports = server;
