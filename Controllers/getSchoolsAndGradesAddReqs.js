
const AddmissionsModel = require("../Models/AddmissionsModel");
const SchoolsModel = require("../Models/SchoolsModel");

const getSchoolsAndGradesAddReqs = async (req , res) => {
    try {
        const {email} = req.query ;
        const schoolData = await SchoolsModel.find({email}) ;
        const schoolId = schoolData.map((data) => data?._id) ;
        const school = await AddmissionsModel.find({ schoolId: { $in: schoolId } }) ;
        res.send(school) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getSchoolsAndGradesAddReqs ;
