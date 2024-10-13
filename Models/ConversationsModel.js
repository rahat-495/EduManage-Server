
const mongoose = require("mongoose") ;

const conversationsSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId ,
        required : true ,
        ref : 'Students' ,
    },
    receiver : {
        type : mongoose.Schema.ObjectId ,
        required : true ,
        ref : 'Students' ,
    },
    participants : [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Students' 
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
