
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const addGrades = async (req , res) => {
    try {
        const classData = req.body ;
        const addClass = await GradesModel.create(classData) ;
        const classId = addClass._id ;
        const updatedSchool = await SchoolsModel.findOne({_id : classData?.schoolId});
        
        updatedSchool?.grades?.push(classId) ;
        updatedSchool?.availableGrades?.push(classData?.gradeNumber) ;
        await SchoolsModel.updateOne({_id : classData?.schoolId} , { $set : { grades :  updatedSchool?.grades , availableGrades : updatedSchool?.availableGrades } }) ;

        const userData = await UsersModel.findOne({email : classData?.email}) ;
        userData?.classes?.push(classId?._id);
        await UsersModel.updateOne({email : userData?.email} , { $set : { classes : userData?.classes } });

        res.send(addClass) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = addGrades ;
