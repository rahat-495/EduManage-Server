
const mongoose = require("mongoose") ;

const StudentsSchema = new mongoose.Schema({
    studentName : {
        type : String ,
        required : [true , "provide studentName"] ,
    },
    studentUid : {
        type : String ,
        required : [true , "provide studentUid"] ,
        unique : true ,
    },
    studentImage : {
        default : "" ,
        type : String ,
        required : [true , "provide studentImage"] ,
    },
    studentEmail : {
        type : String ,
        required : [true , "provide studentEmail"] ,
        unique : true ,
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
