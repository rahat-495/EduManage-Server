
const AddmissionsModel = require("../Models/AddmissionsModel");

const changeAllJoinStatusP = async (req , res) => {
    try {
        const {id} = req.body ;
        const result = await AddmissionsModel.updateOne({_id : id } , { $set : { schoolJoiningStatus : 'pending' , gradeJoiningStatus : 'pending' , isjoined : false } }) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = changeAllJoinStatusP ;
