
const http = require('http') ;
const express = require('express') ;
const {Server} = require('socket.io') ;
const UsersModel = require('../Models/UsersModel');
const ConversationsModel = require('../Models/ConversationsModel');
const app = express() ;

const server = http.createServer(app) ;
const io = new Server(server , {
    cors : {
      origin : [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'https://school-management-de5a5.web.app',
        'https://school-management-de5a5.firebaseapp.com'
      ],
      credentials : true ,
    }
})

let users = [] ;

io.on("connection" , (socket) => {

  socket.on("addUser" , async (studentUid) => {
    if(studentUid){

      await UsersModel.updateOne({studentUid : studentUid} , { $set : { isOnline : true } }) ;
      await ConversationsModel.updateMany({ $and : [ {sender : studentUid} , {isSenderOnline : false} ] } , { $set : { isSenderOnline : true } }) ;
      await ConversationsModel.updateMany({ $and : [ {receiver : studentUid} , {isReceiverOnline : false} ] } , { $set : { isReceiverOnline : true } }) ;
      
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
    if(receiver?.socketId && sender?.socketId && receiver?.studentUid === message?.message?.receiver && sender?.studentUid === message?.message?.sender){
      io.to(receiver?.socketId).to(sender?.socketId).emit("getMessage" , message) ;
    }
    else{
      io.to(sender?.socketId).emit("getMessage" , message) ;
    }
  })
  
  socket.on('disconnect' , async () => {
    const user = users.find((user) => user?.socketId === socket?.id) ;
    await UsersModel.updateOne({studentUid : user?.studentUid} , { $set : { isOnline : false } }) ;
    await ConversationsModel.updateMany({ $and : [ {sender : user?.studentUid} , {isSenderOnline : true} ] } , { $set : { isSenderOnline : false } }) ;
    await ConversationsModel.updateMany({ $and : [ {receiver : user?.studentUid} , {isReceiverOnline : true} ] } , { $set : { isReceiverOnline : false } }) ;
    users = users.filter((user) => user?.socketId !== socket?.id) ;
    io.emit("getUsers" , users) ;
  })

})

module.exports = { app , server } ;
