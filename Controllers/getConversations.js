
const ConversationsModel = require("../Models/ConversationsModel");

const getConversations = async (req , res) => {
    try {
        
        const {uid} = req.query ;
        if(uid){
            const conversations = await ConversationsModel.find({ participants : { $in : [uid] }}) ;
            return res.send(conversations) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getConversations ;
