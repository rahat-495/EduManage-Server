
const mongoose = require("mongoose") ;

const gradeSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : [true , "provide email"] ,
        unique : true,
    },
    gradeName : {
        type : String ,
        required : [true , "provide grade name"] ,
    },
    schoolId : {
        type : mongoose.Schema.ObjectId ,
        required : [true , "provide schoolId"] ,
    },
    gradeNumber : {
        type : String ,
        required : [true , "provide gradeNumber"] ,
    },
    totalStudent : {
        type : String ,
        required : [true , "provide totalStudent"] ,
    },
    gradeType : {
        type : String ,
        required : [true , "provide gradeType"] ,
    },
    subjectsArray : {
        default : [],
        type : Array ,
        required : [true , "provide subjectsArray"] ,
    },
    classTeacherName : {
        type : String ,
        required : [true , "provide classTeacherName"] ,
    },
    totalStudents : {
        default : [],
        type : Array ,
        required : [true , "provide classTeacherName"] ,
    },
})

const GradesModel = mongoose.model("grades" , gradeSchema) ;
module.exports = GradesModel ;
