
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const getStudentsForConversation = async (req , res) => {
    try {
        
        const {email , search} = req.query ;
        const query = new RegExp(search , "i" , "g") ;
        const userData = await UsersModel.findOne({email}) ;
        const schoolData = await SchoolsModel.findOne({ $or : [ { totalStudents : { $in : [userData?.studentUid] } } , { userId : userData?.studentUid } ] }) ;
        const schoolFriends = await UsersModel.find(
            { $and : [ 
                { email : { $ne : email } } ,
                {$or : [ { name : query} , { email : query } ]} , 
                { $or : [ {studentUid : schoolData?.userId} , {studentUid : { $in : schoolData?.totalStudents }} ] } , 
            ]}
        ) ;
        return res.send(schoolFriends) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getStudentsForConversation ;
