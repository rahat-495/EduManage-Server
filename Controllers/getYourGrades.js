
const GradesModel = require("../Models/GradesModel");

const getYourGrades = async (req , res) => {
    try {
        const {email} = req.query ;
        const result = await GradesModel.find({email}).toArray() ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getYourGrades ;
