
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
    sender : {
        type : String,
        required : true,
    },
    receiver : {
        type : String,
        required : true,
    },
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
    },
} , {
    timestamps : true ,
})

const MessagesModel = mongoose.model("Messages" , messagesSchema) ;
module.exports = MessagesModel ;
