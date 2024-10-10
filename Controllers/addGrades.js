
const GradesModel = require("../Models/GradesModel");
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const addGrades = async (req , res) => {
    try {
        const classData = req.body ;
        const addClass = await GradesModel.create(classData) ;
        const classId = addClass.insertedId.toHexString() ;
        const updatedSchool = await SchoolsModel.findOne({_id : classData?.schoolId})
        updatedSchool?.classes?.push(classId) ;
        updatedSchool?.availableGrades?.push(classData?.gradeNumber) ;
        await SchoolsModel.updateOne({_id : classData?.schoolId} , { $set : { classes :  updatedSchool?.classes , availableGrades : updatedSchool?.availableGrades } }) ;
        const userData = await UsersModel.findOne({email : classData?.email}) ;
        userData?.classes?.push(result?.insertedId);
        await UsersModel.updateOne({email : data?.email} , { $set : { classes : userData?.classes } });
        res.send(addClass) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = addGrades ;
