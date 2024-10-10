
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");

const viewGrades = async (req , res) => {
    try {
        const {id} = req.query ;
        const school = await SchoolsModel.findOne({_id : new ObjectId(id)}) ;
        const classes = school?.grades?.map((classId) => new ObjectId(classId?.toHexString()))
        const result = await GradesModel.find({_id : {$in : classes}}).toArray() ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = viewGrades ;
