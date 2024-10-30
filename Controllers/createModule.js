
const ModulesModel = require('../Models/ModuleModel')

const createModule = async (req , res) => {
    try {
        
        const data = req.body ;
        const result = await ModulesModel.create(data) ;
        return res.send(result) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createModule ;
