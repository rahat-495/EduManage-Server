
const ModulesModel = require("../Models/ModuleModel");
const StudentsModel = require("../Models/StudentsModel");

const getMyClassModules = async (req , res) => {
    try {
        const {userUid , subject} = req.query ;
        if(userUid){
            const {grade} = await StudentsModel.findOne({studentUid : userUid}).select('grade') ;
            const modules = await ModulesModel.find({ $and : [ {grade} , {subject} ] }).sort({ "createdAt" : -1 }).select("-moduleImages -textForModule -updatedAt -grade") ; 
            return res.send(modules) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getMyClassModules ;
