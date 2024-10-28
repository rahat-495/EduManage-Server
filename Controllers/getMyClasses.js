
const GradesModel = require("../Models/GradesModel");

const getMyClasses = async (req , res) => {
    try {
        const {userUid} = req.query ;
        if(userUid){
            const gradeSubs = await GradesModel.findOne({ totalStudents : { $in : userUid } }).select("subjectsArray") ;
            return res.send(gradeSubs) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getMyClasses ;
