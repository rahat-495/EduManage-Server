
const mongoose = require("mongoose") ;

const conversationsSchema = new mongoose.Schema({
    sender : {
        type : String ,
        required : true ,
        ref : 'Users' ,
    },
    receiver : {
        type : String ,
        required : true ,
        ref : 'Users' ,
    },
    participants : [
        { 
            type: String, 
            ref: 'Users' 
        },
    ],
    lastMessage : { 
        type: String 
    },
    lastUpdated : { 
        type: Date, 
        default: Date.now 
    },
} , {
    timestamps : true ,
})

const ConversationsModel = mongoose.model("conversations" , conversationsSchema) ;
module.exports = ConversationsModel ;
