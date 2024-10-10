
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");

const getGradesData = async (req , res) => {
    try {
        const {schoolId} = req.query ;
        if(schoolId){
            const school  = await SchoolsModel.findOne({_id : new ObjectId(schoolId?.toHexString())}) ;
            const classesId = school?.classes?.map((id) => new ObjectId(id)) ;
            const classes = await GradesModel.find({ _id : { $in : classesId } }).toArray() ;
            res.send(classes) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGradesData ;
