
const UsersModel = require("../Models/UsersModel");

const getCurrentUserDetails = async (req , res) => {
    try {
        const token = req?.cookies?.token ;
        const {email} = req.query ;
        const user = await UsersModel.findOne({email}) ;
        return res.send(user) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getCurrentUserDetails ;
