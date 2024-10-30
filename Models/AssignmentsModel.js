
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    moduleName : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter moduleName']
    },
    textForModule : {
        type : String ,
        default : '' ,
    },
    moduleDescription : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter moduleDescription']
    },
    moduleImages : {
        type : Array ,
        default : [] ,
    },
    date : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter date']
    },
    grade : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter grade']
    },
    subject : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter subject']
    },
} , {
    timestamps : true
})

const AssignmentModel = mongoose.model('assignments' , assignmentSchema) ;
module.exports = AssignmentModel ;