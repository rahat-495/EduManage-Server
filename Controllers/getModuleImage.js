
const ModulesModel = require("../Models/ModuleModel");

const getModuleImage = async (req , res) => {
    try {
        const {moduleId , imageIndexNumber} = req.query ;
        const module = await ModulesModel.findById(moduleId) ;
        const image = module?.moduleData[1]?.moduleImages?.find((image , index) => index === parseInt(imageIndexNumber) && image) ;
        return res.send({image}) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getModuleImage ;
