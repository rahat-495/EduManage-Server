
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    moduleData : {
        type : Array ,
        default : [
            {
                textForModuleTitle : {
                    type : String ,
                    default : '' ,
                } ,
                textForModule : {
                    type : String ,
                    default : '' ,
                },
            },
            {
                moduleImages : {
                    type : Array ,
                    default : [] ,
                } ,
            },
            {
                moduleVideos : {
                    type : Array ,
                    default : [] ,
                } ,
            },
        ] ,
        required : [true , 'plz enter moduleName']
    },
    moduleName : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter moduleName']
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