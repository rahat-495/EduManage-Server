
const ModulesModel = require("../Models/ModuleModel");

const getGoToNextLink = async (req , res) => {
    try {
        
        const {moduleId , subject} = req.query ;
        const modules = await ModulesModel.find({subject}).sort({ "createdAt" : 1 }).select("_id") ;
        const indexOfMyCurrentModule = modules.findIndex((module) => module?._id.toString() === moduleId);
        console.log(modules[indexOfMyCurrentModule+1]?.id ? modules[indexOfMyCurrentModule+1]?.id : null) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGoToNextLink ;
