
const StudentsModel = require("../Models/StudentsModel");

const getJoinedStudentInfo = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await StudentsModel.findById(id) ;
        return res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getJoinedStudentInfo ;
