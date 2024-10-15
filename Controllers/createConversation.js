
const ConversationsModel = require("../Models/ConversationsModel");

const createConversation = async (req , res) => {
    try {
        
        const data = req.body ;
        const isAxistConversation = await ConversationsModel.findOne({ $and : [ { sender : data?.sender } , { receiver : data?.receiver } ] }) ;
        if(!isAxistConversation?._id){
            const createConversation = await ConversationsModel.create(data) ;
            return res.send(createConversation) ;
        }
        else{
            return res.send({message : "conversation already axist !" , success : false}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createConversation ;
