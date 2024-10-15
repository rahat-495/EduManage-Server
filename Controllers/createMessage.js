
const ConversationsModel = require("../Models/ConversationsModel");
const MessagesModel = require("../Models/MessagesModel");

const createMessage = async (req , res) => {
    try {
        
        const data = req.body ;
        const conversationdata = await ConversationsModel.findOne(
            {$or : [ 
                { $and : [ {sender : data?.sender} , {receiver : data?.receiver} ] } , 
                { $and : [ {sender : data?.receiver} , {receiver : data?.sender} ] } 
            ]}
        ).select("_id") ;
        const createMessage = await MessagesModel.create({...data , conversationId : conversationdata?._id}) ;
        await ConversationsModel.updateOne({_id : conversationdata?._id} , { $set : { lastMessage : data?.text , updatedAt : Date.now() } }) ;
        return res.send(createMessage) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createMessage ;
