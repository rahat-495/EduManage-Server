
const ModulesModel = require("../Models/ModuleModel");

const getUploadedModulesList = async (req , res) => {
    try {
        
        const {grade , subject} = req.query ;
        if(grade && subject){
            const modules = await ModulesModel.find({ $and : [ {grade} , {subject} ] }).sort({ "createdAt" : 1 }).select("-moduleImages -textForModule -updatedAt -grade") ;
            return res.send(modules) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getUploadedModulesList ;
