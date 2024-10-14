
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const getStudentsForConversation = async (req , res) => {
    try {
        
        const {email , search} = req.query ;
        const query = new RegExp(search , "i" , "g") ;
        const userData = await UsersModel.findOne({email}) ;
        const schoolData = await SchoolsModel.findOne({ totalStudents : { $in : [userData?.studentUid] } }).select("totalStudents") ;
        const schoolFriends = await UsersModel.find({ $and : [ {studentUid : { $in : schoolData?.totalStudents }} , {$or : [ { name : query} , { email : query } ]} ] }) ;
        return res.send(schoolFriends) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getStudentsForConversation ;
