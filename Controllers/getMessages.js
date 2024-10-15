
const ConversationsModel = require("../Models/ConversationsModel");
const MessagesModel = require("../Models/MessagesModel");

const getMessages = async (req , res) => {
    try {
        
        const {sender , receiver} = req.query ;
        const conversationId = await ConversationsModel.findOne({ $and : [ {sender} , {receiver} ] }).select("_id") ;
        const messages = await MessagesModel.find({conversationId}) ;
        return res.send(messages) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getMessages ;
