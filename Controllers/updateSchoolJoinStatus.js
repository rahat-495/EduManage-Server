
const AddmissionsModel = require("../Models/AddmissionsModel");
const StudentsModel = require("../Models/StudentsModel");
const UsersModel = require("../Models/UsersModel");

const updateSchoolJoinStatus = async (req , res) => {
    try {
        const {id , schoolJoiningStatus} = req.body ;
        const addmissionData = await AddmissionsModel.findOne({_id : id }) ;
        const isStudentAxist = await StudentsModel.findOne({studentEmail : addmissionData?.studentEmail}) ;
        const isJoinedASchool = await AddmissionsModel.findOne({ $and : [ {studentEmail : addmissionData?.studentEmail} , {isjoined : true} ] }) ;
        if(!isJoinedASchool?.isjoined){
            if(!addmissionData?.isjoined){
                if(schoolJoiningStatus === 'accepted' && addmissionData?.gradeJoiningStatus === 'accepted'){
                    await AddmissionsModel.updateOne({_id : id } , { $set : { isjoined : true } }) ;
                    await UsersModel.updateOne({studentUid : addmissionData?.studentUid } , { $set : { isjoined : addmissionData?.schoolId , isjoinedModalSeen : false } }) ;
                    if(!isStudentAxist?.studentEmail){
                        await StudentsModel.create({ ...addmissionData , schoolJoiningStatus : true , gradeJoiningStatus : true , isjoined : true , date : new Date().toDateString() , filteringDate : new Date().toLocaleDateString() })
                    }
                }
                if(addmissionData?.gradeJoiningStatus === 'rejected' && addmissionData?.schoolJoiningStatus === 'rejected'){
                    await AddmissionsModel.updateOne({_id : id } , { $set : { isjoined : false } }) ;
                }
                const result = await AddmissionsModel.updateOne({_id : id } , { $set : { schoolJoiningStatus } }) ;
                return res.send(result) ;
            }
            else if(schoolJoiningStatus === addmissionData?.schoolJoiningStatus){
                return res.send({message : "You Already Accept Him !" , status : 'warning'}) ;
            }
            else if(addmissionData){
                return res.send({message : "You Already Accept Him !" , status : 'warning'}) ;
            }
            else{
                return res.send({message : "You Can't Accept Now !" , status : 'error'}) ;
            }
        }
        else{
            return res.send({message : "He Already Joined One !" , status : 'alreadyJoined'}) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = updateSchoolJoinStatus ;
