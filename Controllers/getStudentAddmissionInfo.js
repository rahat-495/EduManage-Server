
const AddmissionsModel = require("../Models/AddmissionsModel");
const GradesModel = require("../Models/GradesModel");

const getStudentAddmissionInfo = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await AddmissionsModel.findOne({_id : id}) ;
        const gradeData = await GradesModel.findOne({_id : result?.grade }) ;
        res.send({...result?._doc , gradeNumber : gradeData?.gradeNumber}) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getStudentAddmissionInfo ;
