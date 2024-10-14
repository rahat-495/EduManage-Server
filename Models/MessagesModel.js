
const mongoose = require("mongoose") ;

const messagesSchema = new mongoose.Schema({
    text : {
        type : String ,
        default : '' ,
    },
    imageUrl : {
        type : String ,
        default : '' ,
    },
    videoUrl : {
        type : String ,
        default : '' ,
    },
    seen : {
        type : Boolean,
        default : false
    },
    senderUid : {
        type : '',
        required : true,
    },
    conversationId : {
        type : mongoose.Schema.ObjectId,
        required : true,
    },
} , {
    timestamps : true ,
})

const MessagesModel = mongoose.model("Messages" , messagesSchema) ;
module.exports = MessagesModel ;
