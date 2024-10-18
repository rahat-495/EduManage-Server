
const connectDB = require('./Config/connectDB');
const express = require('express');
const cors = require('cors');
const router = require('./Routes/routes');
const { app , server } = require('./Socket');
const port = process.env.PORT || 5555 ;

app.use(cors({
  origin : [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'https://school-management-de5a5.web.app',
    'https://school-management-de5a5.firebaseapp.com'
  ],
  credentials : true ,
})) ;
app.use(express.json()) ;
require("dotenv").config() ;

connectDB() ;
app.use('/api' , router)

app.get('/' , (req , res) => {
  res.send("school server is running !")
})

server.listen(port , () => {
  console.log(`the server is running at port ${port}`);
})
