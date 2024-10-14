
const ConversationsModel = require("../Models/ConversationsModel");
const UsersModel = require("../Models/UsersModel");

const getReceiverDetails = async (req , res) => {
    try {
        
        const {studentUid} = req.query ;
        const receiverDetails = await UsersModel.findOne({studentUid}) ;
        return res.send(receiverDetails) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getReceiverDetails ;
