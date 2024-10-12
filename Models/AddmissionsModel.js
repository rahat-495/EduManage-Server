
const mongoose = require("mongoose") ;

const AddmissionSchema = new mongoose.Schema({
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
    grade : {
        type : String ,
        required : [true , "provide grade"] ,
    },
    schoolId : {
        type : String ,
        required : [true , "provide schoolId"] ,
    },
    schoolJoiningStatus : {
        type : String ,
        default : "pending" ,
        required : [true , "provide schoolJoiningStatus"] ,
    },
    gradeJoiningStatus : {
        type : String ,
        default : "pending" ,
        required : [true , "provide gradeJoiningStatus"] ,
    },
    isjoined : {
        type : Boolean ,
        default : false ,
    },
})

const AddmissionsModel = mongoose.model("addmissions" , AddmissionSchema) ;
module.exports = AddmissionsModel ;
