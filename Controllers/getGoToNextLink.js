
const ModulesModel = require("../Models/ModuleModel");

const getGoToNextLink = async (req , res) => {
    try {
        
        const {moduleId , subject} = req.query ;
        if(moduleId , subject){
            const modules = await ModulesModel.find({subject}).sort({ "createdAt" : 1 }).select("_id") ;
            const indexOfMyCurrentModule = modules.findIndex((module) => module?._id.toString() === moduleId) ;
            const link = modules[indexOfMyCurrentModule+1]?.id ? 'textinstruction/'+modules[indexOfMyCurrentModule+1]?.id : "noModuleAreCooket" ;
            return res.send({link , success : modules[indexOfMyCurrentModule+1]?.id ? true : false}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGoToNextLink ;
