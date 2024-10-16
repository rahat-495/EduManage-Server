
const http = require('http') ;
const express = require('express') ;
const {Server} = require('socket.io') ;
const app = express() ;

const server = http.createServer(app) ;
const io = new Server(server , {
    cors : {
      origin : [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://school-management-de5a5.web.app',
        'https://school-management-de5a5.firebaseapp.com'
      ],
      credentials : true ,
    }
})

let users = [] ;

io.on("connection" , (socket) => {
  
  // console.log("socket connected !" , socket?.id) ;

  socket.on("addUser" , (studentUid) => {
    if(studentUid){
      const isUserAxist = users.find(((user) => user?.studentUid === studentUid)) ;
      if(!isUserAxist){
        const user = {studentUid , socketId : socket?.id} ;
        users.push(user) ;
        io.emit("getUsers" , users) ;
      }
    }
  })

  socket.on("sendMessage" , async (message) => {
    const receiver = users.find((user) => user?.studentUid === message?.message?.receiver) ;
    const sender = users.find((user) => user?.studentUid === message?.message?.sender) ;
    if(receiver?.socketId && sender?.socketId){
      io.to(receiver?.socketId).to(sender?.socketId).emit("getMessage" , message) ;
    }
    else{
      io.to(sender?.socketId).emit("getMessage" , message) ;
    }
  })

  socket.on('disconnect' , () => {
    users = users.filter((user) => user?.socketId !== socket?.id) ;
    io.emit("getUsers" , users) ;
  })

})

module.exports = { app , server } ;
