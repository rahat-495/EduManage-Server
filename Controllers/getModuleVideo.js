
const ModulesModel = require("../Models/ModuleModel");

const getModuleVideo = async (req , res) => {
    try {
        const {moduleId , videoIndexNumber} = req.query ;
        const module = await ModulesModel.findById(moduleId) ;
        const video = module?.moduleData[2]?.moduleVideos?.find((video , index) => index === parseInt(videoIndexNumber) && video) ;
        return res.send({video}) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getModuleVideo ;
