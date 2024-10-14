
const ConversationsModel = require("../Models/ConversationsModel");

const createConversation = async (req , res) => {
    try {
        
        const data = req.body ;
        const createConversation = await ConversationsModel.create(data) ;
        return res.send(createConversation) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createConversation ;
