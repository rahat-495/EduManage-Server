
const SchoolsModel = require("../Models/SchoolsModel");
const StudentsModel = require("../Models/StudentsModel");

const getAllStudents = async (req , res) => {
    try {
        const {email} = req.query ;
        const schoolsData = await SchoolsModel.find({email}) ;
        const schoolsId = schoolsData?.map((school) => school?._id.toHexString()) ;
        const allStudents = await StudentsModel.find({ schoolId : { $in : schoolsId } }) ;
        res.send(allStudents) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getAllStudents ;
