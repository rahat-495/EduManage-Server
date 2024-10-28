
const StudentsModel = require("../Models/StudentsModel");

const getGradeStudents = async (req , res) => {
    try {
        const {id} = req.query ;
        if(id){
            const students = await StudentsModel.find({ grade : id }) ;
            return res.send(students) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGradeStudents ;
