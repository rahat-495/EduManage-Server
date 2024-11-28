
const ModulesModel = require("../Models/ModuleModel");
const UsersModel = require("../Models/UsersModel");

const getGoToPrevLink = async (req , res) => {
    try {
        
        const {moduleId , subject , studentUid , link} = req.query ;
        const {lastSeenModuleDatas} = await UsersModel.findOne({studentUid}).select("lastSeenModuleDatas") ;
        if(link && subject && studentUid){
            const updatedLink = lastSeenModuleDatas?.filter((link) => !link?.includes(subject)) ;
            const newLinks = [...updatedLink , subject+'/'+link] ;
            await UsersModel.updateOne({studentUid} , { $set : { lastSeenModuleDatas : newLinks } } ) ;
            return res.send({message : "link are updated !" , success : true , reload : true})
        }
        else if(moduleId && subject && !link){
            const modules = await ModulesModel.find({subject}).sort({ "createdAt" : 1 }) ;
            const indexOfMyCurrentModule = modules.findIndex((module) => module?._id.toString() === moduleId);
            if(modules[indexOfMyCurrentModule-1]){
                if(modules[indexOfMyCurrentModule-1]?.moduleData[2]?.moduleVideos?.length > 0){

                    const link = 'videos/'+(modules[indexOfMyCurrentModule-1]?.moduleData[2]?.moduleVideos?.length-1)?.toString()+'/'+modules[indexOfMyCurrentModule-1]?._id+'/'+modules[indexOfMyCurrentModule-1]?.moduleData[2]?.moduleVideos?.at(-1)?.videoName?.split(' ')?.join('_') ;

                    const updatedLink = lastSeenModuleDatas?.filter((link) => !link?.includes(subject)) ;
                    const newLinks = [...updatedLink , subject+'/'+link] ;
                    await UsersModel.updateOne({studentUid} , { $set : { lastSeenModuleDatas : newLinks } } ) ;

                    return res.send({link , success : true, reload : true}) ;
                }
                else if(modules[indexOfMyCurrentModule-1]?.moduleData[1]?.moduleImages?.length > 0){
                    const link = 'images/'+(modules[indexOfMyCurrentModule-1]?.moduleData[1]?.moduleImages?.length-1)?.toString()+'/'+modules[indexOfMyCurrentModule-1]?._id+'/'+modules[indexOfMyCurrentModule-1]?.moduleData[1]?.moduleImages?.at(-1)?.imageName?.split(' ')?.join('_') ;

                    const updatedLink = lastSeenModuleDatas?.filter((link) => !link?.includes(subject)) ;
                    const newLinks = [...updatedLink , subject+'/'+link] ;
                    await UsersModel.updateOne({studentUid} , { $set : { lastSeenModuleDatas : newLinks } } ) ;
                    
                    return res.send({link , success : true, reload : true}) ;
                }
                else if(modules[indexOfMyCurrentModule-1]?.moduleData[0]?.textForModuleTitle?.length > 0){
                    const link = '/textinstruction/'+modules[indexOfMyCurrentModule-1]?._id ;

                    const updatedLink = lastSeenModuleDatas?.filter((link) => !link?.includes(subject)) ;
                    const newLinks = [...updatedLink , subject+'/'+link] ;
                    await UsersModel.updateOne({studentUid} , { $set : { lastSeenModuleDatas : newLinks } } ) ;

                    return res.send({link , success : true, reload : true}) ;
                }
            }
            else{
                return res.send({link : "no module are previous !" , success : false})
            }
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getGoToPrevLink ;
