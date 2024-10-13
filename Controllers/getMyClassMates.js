
const GradesModel = require("../Models/GradesModel");
const StudentsModel = require("../Models/StudentsModel");

const getMyClassMates = async (req , res) => {
    try {
        
        const {email} = req.query ;
        const studentData = await StudentsModel.findOne({studentEmail : email}) ;
        const {totalStudents} = await GradesModel.findById(studentData?.grade) ;
        if(totalStudents?.length > 0){
            const gradeJoinedStudents = await StudentsModel.find({ $and : [ { studentUid : { $in : totalStudents } } , { studentEmail : { $ne : email } } ] }) ;
            return res.send(gradeJoinedStudents) ;
        }
        else{
            return res.send({message : "No Class Mates Found !" , success : false}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getMyClassMates ;
