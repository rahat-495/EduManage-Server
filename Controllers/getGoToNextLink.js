
const ModulesModel = require("../Models/ModuleModel");

const getGoToNextLink = async (req , res) => {
    try {
        
        const {moduleId , subject , studentUid} = req.query ;
        console.log(moduleId , subject , studentUid)
        if(moduleId , subject){
            const modules = await ModulesModel.find({subject}).sort({ "createdAt" : 1 }).select("_id") ;
            const indexOfMyCurrentModule = modules.findIndex((module) => module?._id.toString() === moduleId) ;
            const link = modules[indexOfMyCurrentModule+1]?.id ? 'textinstruction/'+modules[indexOfMyCurrentModule+1]?.id : "noModuleAreCooket" ;
            console.log(link)
            return res.send({link , success : modules[indexOfMyCurrentModule+1]?.id ? true : false}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGoToNextLink ;
