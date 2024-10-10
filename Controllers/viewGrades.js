
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");

const viewGrades = async (req , res) => {
    try {
        const {id} = req.query ;
        const school = await SchoolsModel.findOne({_id : id}) ;
        const classes = school?.grades?.map((classId) => classId )
        const result = await GradesModel.find({_id : {$in : classes}}) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = viewGrades ;
