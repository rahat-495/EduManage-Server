
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
                    if(!isStudentAxist?.studentEmail){
                        const studentData = {
                            studentName: addmissionData.studentName,
                            studentUid: addmissionData.studentUid,
                            studentImage: addmissionData.studentImage,
                            studentEmail: addmissionData.studentEmail,
                            studentNumber: addmissionData.studentNumber,
                            parentNumber: addmissionData.parentNumber,
                            fatherName: addmissionData.fatherName,
                            motherName: addmissionData.motherName,
                            gender: addmissionData.gender,
                            schoolName: addmissionData.schoolName,
                            address: addmissionData.address,
                            gradeNumber: addmissionData.gradeNumber,
                            grade: addmissionData.grade,
                            schoolId: addmissionData.schoolId,
                            isjoined: true,
                            schoolJoiningStatus: true,
                            gradeJoiningStatus: true,
                            date: new Date().toDateString(),
                            filteringDate: new Date().toLocaleDateString(),
                        };
                        const createStudent =  await StudentsModel.create(studentData)
                        console.log("student" , createStudent)
                    }
                    
                    const grade = await GradesModel.findById(addmissionData?.grade) ;
                    grade?.totalStudents.push(addmissionData?.studentUid) ;
                    const gradeUpdate = await GradesModel.updateOne({_id : grade?._id} , { $set : { totalStudents : grade?.totalStudents } })
                    
                    const school = await SchoolsModel.findById(addmissionData?.schoolId) ;
                    school?.totalStudents.push(addmissionData?.studentUid) ;
                    const schoolUpdate = await SchoolsModel.updateOne({_id : school?._id} , { $set : { totalStudents : school?.totalStudents } })
                    
                    const result = await AddmissionsModel.updateOne({_id : id } , { $set : { isjoined : true , schoolJoiningStatus : schoolJoiningStatus } }) ;
                    await UsersModel.updateOne({studentUid : addmissionData?.studentUid } , { $set : { isjoined : addmissionData?.schoolId , isjoinedModalSeen : false } }) ;
                    res.send(result) ;
                }
                else{
                    const result = await AddmissionsModel.updateOne({_id : id } , { $set : { schoolJoiningStatus } }) ;
                    return res.send(result) ;
                }
                if(addmissionData?.gradeJoiningStatus === 'rejected' && addmissionData?.schoolJoiningStatus === 'rejected'){
                    const rejectedResult = await AddmissionsModel.updateOne({_id : id } , { $set : { isjoined : false } }) ;
                    return res.send(rejectedResult) ;
                }
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
