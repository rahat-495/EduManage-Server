
const ModulesModel = require('../Models/ModuleModel')

const createAssignment = async (req , res) => {
    try {
        
        const data = req.body ;
        const result = await ModulesModel.create(data) ;
        return res.send(result) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createAssignment ;
