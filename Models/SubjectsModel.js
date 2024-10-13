
const mongoose = require("mongoose") ;

const subjectsSchema = new mongoose.Schema({
    grade : {
        type : String ,
        required : [true , "Provide Grade"] ,
    },
    subjectName : {
        type : String ,
        required : [true , "Provide subjectName"] ,
    },
})
