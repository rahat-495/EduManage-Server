
const mongoose = require("mongoose") ;

const StudentsSchema = new mongoose.Schema({
    studentName : {
        type : String ,
        required : [true , "provide studentName"] ,
    },
    studentUid : {
        type : String ,
        required : [true , "provide studentUid"] ,
    },
    studentImage : {
        default : "" ,
        type : String ,
        required : [true , "provide studentImage"] ,
    },
    studentEmail : {
        type : String ,
        required : [true , "provide studentEmail"] ,
    },
    studentNumber : {
        type : String ,
        required : [true , "provide studentNumber"] ,
    },
    parentNumber : {
        type : String ,
        required : [true , "provide parentNumber"] ,
    },
    fatherName : {
        type : String ,
        required : [true , "provide fatherName"] ,
    },
    motherName : {
        type : String ,
        required : [true , "provide motherName"] ,
    },
    grade : {
        type : String ,
        required : [true , "provide grade"] ,
    },
    gender : {
        type : String ,
        required : [true , "provide gender"] ,
    },
    schoolName : {
        type : String ,
        required : [true , "provide schoolName"] ,
    },
    address : {
        type : String ,
        required : [true , "provide address"] ,
    },
    gradeNumber : {
        type : String ,
        required : [true , "provide gradeNumber"] ,
    },
    schoolId : {
        type : String ,
        required : [true , "provide schoolId"] ,
    },
    schoolJoiningStatus : {
        type : Boolean ,
        default : true ,
    },
    gradeJoiningStatus : {
        type : Boolean ,
        default : true ,
    },
    isjoined : {
        type : Boolean ,
        default : true ,
    },
    date : {
        type : String ,
        default : new Date().toDateString() ,
    },
    filteringDate : {
        type : String ,
        default : new Date().toLocaleDateString() ,
    },
})

const StudentsModel = mongoose.model("students" , StudentsSchema) ;
module.exports = StudentsModel ;
