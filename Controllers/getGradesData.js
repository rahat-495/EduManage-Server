
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");

const getGradesData = async (req , res) => {
    try {
        const {schoolId} = req.query ;
        if(schoolId){
            const school  = await SchoolsModel.findOne({_id : schoolId }) ;
            const classesId = school?.classes?.map((id) => id) ;
            const classes = await GradesModel.find({ _id : { $in : classesId } }) ;
            res.send(classes) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGradesData ;
