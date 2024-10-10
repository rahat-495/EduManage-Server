
const AddmissionsModel = require("../Models/AddmissionsModel");

const getJoinedStudentInfo = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await AddmissionsModel.findOne({_id : id}) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getJoinedStudentInfo ;
