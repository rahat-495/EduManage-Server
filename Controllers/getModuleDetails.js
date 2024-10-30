
const ModulesModel = require("../Models/ModuleModel");

const getModuleDetails = async (req , res) => {
    try {
        
        const {id} = req.query ;
        if(id){
            const module = await ModulesModel.findById(id) ;
            return res.send(module) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getModuleDetails ;
