
const mongoose = require("mongoose") ;

const conversationsSchema = new mongoose.Schema({
    sender : {
        type : String ,
        required : true ,
        ref : 'Users' ,
    },
    senderName : {
        type : String ,
        required : true ,
    },
    senderEmail : {
        type : String ,
        required : true ,
    },
    senderImage : {
        type : String ,
        required : true ,
    },
    receiver : {
        type : String ,
        required : true ,
        ref : 'Users' ,
    },
    receiverName : {
        type : String ,
        required : true ,
    },
    receiverEmail : {
        type : String ,
        required : true ,
    },
    receiverImage : {
        type : String ,
        required : true ,
    },
    participants : [
        { 
            type: String, 
            ref: 'Users' 
        },
    ],
    isSenderOnline : { 
        type: Boolean ,
        default : false ,
    },
    isReceiverOnline : { 
        type: Boolean ,
        default : false ,
    },
    lastMessage : { 
        type: String 
    },
} , {
    timestamps : true ,
})

const ConversationsModel = mongoose.model("conversations" , conversationsSchema) ;
module.exports = ConversationsModel ;
