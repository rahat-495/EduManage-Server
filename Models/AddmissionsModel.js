
const mongoose = require("mongoose") ;

const AddmissionSchema = new mongoose.Schema({
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
        type : String ,
        default : "pending" ,
        required : [true , "provide grade"] ,
    },
    gradeJoiningStatus : {
        type : String ,
        default : "pending" ,
        required : [true , "provide grade"] ,
    },
    isjoined : {
        type : Boolean ,
        default : false ,
    },
})

const AddmissionsModel = mongoose.model("addmissions" , AddmissionSchema) ;
module.exports = AddmissionsModel ;
