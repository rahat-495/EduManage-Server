
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    moduleName : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter moduleName']
    },
    textForModule : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter textForModule']
    },
    moduleDescription : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter moduleDescription']
    },
    moduleImages : {
        type : Array ,
        default : [] ,
        required : [true , 'plz enter moduleImages']
    },
    date : {
        type : String ,
        default : '' ,
        required : [true , 'plz enter date']
    },
})

const ModulesModel = mongoose.model('modules' , moduleSchema) ;
module.exports = ModulesModel ;