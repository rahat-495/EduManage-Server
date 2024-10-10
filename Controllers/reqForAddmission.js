
const AddmissionsModel = require("../Models/AddmissionsModel");
const GradesModel = require("../Models/GradesModel");

const reqForAddmission = async (req , res) => {
    try {
        const addmissionData = req.body ;
        const {gradeNumber} = await GradesModel.findOne({_id : addmissionData?.grade }) ;
        addmissionData.gradeNumber = gradeNumber ;
        const isAxist = await AddmissionsModel.findOne({studentEmail : addmissionData?.studentEmail}) ;
        if(addmissionData?.schoolId !== isAxist?.schoolId){
            const result = await AddmissionsModel.create(addmissionData) ;
            return res.send(result) ;
        }
        else{
            return res.send({message : "You Are Already Applied , on this school or grade !" , success : false}) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = reqForAddmission ;
