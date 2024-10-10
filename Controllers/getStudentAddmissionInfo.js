
const SchoolsModel = require("../Models/SchoolsModel");

const getStudentAddmissionInfo = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await addmissionsCollection.findOne({_id : id}) ;
        const gradeData = await classesCollection.findOne({_id : result?.grade }) ;
        res.send({...result , gradeNumber : gradeData?.gradeNumber}) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getStudentAddmissionInfo ;
