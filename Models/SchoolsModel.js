
const mongoose = require("mongoose") ;

const SchoolSchema = new mongoose.Schema({
    schoolName : {
        type : String ,
        required : [true , "Provide School Name"] ,
    },
    schoolCode : {
        type : String ,
        required : [true , "Provide School code"] ,
    },
    schoolLogo : {
        type : String ,
        default : "" ,
    },
    phone : {
        type : String ,
        required : [true , "Provide Phone"] ,
    },
    address : {
        type : String ,
        required : [true , "Provide address"] ,
    },
    country : {
        type : String ,
        required : [true , "Provide country"] ,
    },
    city : {
        type : String ,
        required : [true , "Provide city"] ,
    },
    postalCode : {
        type : String ,
        required : [true , "Provide postalCode"] ,
    },
    userId : {
        type : String ,
        unique : true ,
        required : [true , "Provide userId"] ,
    },
    userName : {
        type : String ,
        required : [true , "Provide userName"] ,
    },
    email : {
        type : String ,
        unique : true ,
        required : [true , "Provide email"] ,
    },
    principalName : {
        type : String ,
        required : [true , "Provide principalName"] ,
    },
    principalContact : {
        type : String ,
        required : [true , "Provide principalContact"] ,
    },
    schoolType : {
        type : String ,
        required : [true , "Provide schoolType"] ,
    },
    grades : {
        type : Array ,
        default : [] ,
    },
    totalStudents : {
        type : Array ,
        default : [] ,
    },
})

const SchoolsModel = mongoose.model("Schools" , SchoolSchema) ;
module.exports = SchoolsModel ;
