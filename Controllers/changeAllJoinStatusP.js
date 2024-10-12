
const AddmissionsModel = require("../Models/AddmissionsModel");
const StudentsModel = require("../Models/StudentsModel");

const changeAllJoinStatusP = async (req , res) => {
    try {
        const {id} = req.body ;
        const addmissionsData = await AddmissionsModel.findById(id) ;
        const isStudentAxist = await StudentsModel.findOne({studentUid : addmissionsData?.studentUid}) ;
        console.log(isStudentAxist)
        if(!isStudentAxist?._id){
            const result = await AddmissionsModel.updateOne({_id : id } , { $set : { schoolJoiningStatus : 'pending' , gradeJoiningStatus : 'pending' , isjoined : false } }) ;
            return res.send(result) ;
        }
        else{
            return res.send({message : "Student is already joined this school !" , success : false})
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = changeAllJoinStatusP ;
