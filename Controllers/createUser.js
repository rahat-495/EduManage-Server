
const UsersModel = require("../Models/UsersModel");

const createUser = async (req , res) => {
    try {
        const data = req.body ;
        const isAxist = await UsersModel.findOne({email : data?.email}) ;
        if(!isAxist){
            const result = await UsersModel.create(data) ;
            const user = await UsersModel.findOne({_id : result?.insertedId}) ;
            return res.send(user) ;
        }
        else{
            const user = await UsersModel.findOne({_id : isAxist?._id }) ;
            return res.send(user) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createUser ;
