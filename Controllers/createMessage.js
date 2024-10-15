
const ConversationsModel = require("../Models/ConversationsModel");
const MessagesModel = require("../Models/MessagesModel");

const createMessage = async (req , res) => {
    try {
        
        const data = req.body ;
        const conversationdata = await ConversationsModel.findOne({ $and : [ {sender : data?.sender} , {receiver : data?.receiver} ] }).select("_id") ;
        const createMessage = await MessagesModel.create({...data , conversationId : conversationdata?._id})
        return res.send(createMessage) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createMessage ;
