
const AddmissionsModel = require("../Models/AddmissionsModel");
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");

const getSchoolsAndGradesAddReqs = async (req , res) => {
    try {
        const {email} = req.query ;
        const schoolData = await SchoolsModel.find({email}).toArray() ;
        const schoolId = schoolData.map((data) => data?._id.toString()) ;
        const school = await AddmissionsModel.find({ schoolId: { $in: schoolId } }).toArray() ;
        res.send(school) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getSchoolsAndGradesAddReqs ;
