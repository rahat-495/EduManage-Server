
const UsersModel = require("../Models/UsersModel");

const updateIsSeenModal = async (req , res) => {
    try {
        
        const {_id} = req.body ;
        const updateIsSeen = await UsersModel.updateOne({_id : _id} , { $set : { isjoinedModalSeen : true } }) ;
        return res.send(updateIsSeen) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = updateIsSeenModal ;
