
const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "Provide Name"] ,
    },
    email : {
        type : String ,
        required : [true , "Provide Email"] ,
        unique : true ,
    },
    image : {
        type : String ,
        default : "" ,
    },
    studentUid : {
        type : String ,
        required : [true , "Provide StudentUid"] ,
        unique : true ,
    },
    role : {
        type : String ,
        default : "student" ,
    },
    isBlock : {
        type : Boolean ,
        default : false ,
    },
    isFired : {
        type : Boolean ,
        default : false ,
    },
    isjoined : {
        type : String ,
        default : "" ,
    },
    isjoinedModalSeen : {
        type : Boolean ,
        default : false ,
    },
    applyForTeacher : {
        type : String ,
        default : "No" ,
    },
    schools : {
        type : Array ,
        default : [] ,
    },
    grades : {
        type : Array ,
        default : [] ,
    },
    classes : {
        type : Array ,
        default : [] ,
    },
    removedDevice : {
        type : Array ,
        default : [] ,
    },
    devicesInfo: {
        type : [
            {
                deviceName : { type: String },
                loginDate : { type: String },
                loginTime : { type: String },
                loginShift : { type: String },
                isRemoved : { type: Boolean, default: false },
            }
        ],
        default : []
    },
})

const UsersModel = mongoose.model("Users" , userSchema) ;
module.exports = UsersModel ;
