
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
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
    time : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter time']
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

const ModulesModel = mongoose.model('modules' , moduleSchema) ;
module.exports = ModulesModel ;