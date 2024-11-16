
const ModulesModel = require("../Models/ModuleModel");

const getGoToPrevLink = async (req , res) => {
    try {
        
        const {moduleId , subject} = req.query ;
        if(moduleId , subject){
            const modules = await ModulesModel.find({subject}).sort({ "createdAt" : 1 }) ;
            const indexOfMyCurrentModule = modules.findIndex((module) => module?._id.toString() === moduleId);
            if(modules[indexOfMyCurrentModule-1]){
                if(modules[indexOfMyCurrentModule-1]?.moduleData?.length === 3){
                    return res.send({link : 'videos/'+(modules[indexOfMyCurrentModule-1]?.moduleData[2]?.moduleVideos?.length-1)?.toString()+'/'+modules[indexOfMyCurrentModule-1]?._id+'/'+modules[indexOfMyCurrentModule-1]?.moduleData[2]?.moduleVideos?.at(-1)?.videoName?.split(' ')?.join('_')})
                }
            }
            else{
                // return res.send({link : modules[indexOfMyCurrentModule+1]?.id ? 'textinstruction/'+modules[indexOfMyCurrentModule+1]?.id : "noModuleAreCooket"})
            }
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGoToPrevLink ;
