
const http = require('http') ;
const express = require('express') ;
const {Server} = require('socket.io') ;
const app = express() ;

const server = http.createServer(app) ;
const io = new Server(server , {
    cors : {
        origin : [
          'http://localhost:5173',
          'https://school-management-de5a5.web.app',
          'https://school-management-de5a5.firebaseapp.com'
        ],
        credentials : true ,
    }
})

module.exports = { app , server } ;
