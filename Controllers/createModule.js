
const GradesModel = require('../Models/GradesModel');
const ModulesModel = require('../Models/ModuleModel');
const UsersModel = require('../Models/UsersModel');

const createModule = async (req , res) => {
    try {
        
        const data = req.body ;
        const isAlreadyUploadModule = await ModulesModel.findOne({grade : data?.grade , subject : data?.subject}) ;
        if(isAlreadyUploadModule?._id){
            const result = await ModulesModel.create(data) ;
            return res.send(result) ;
        }
        else{
            const {totalStudents} = await GradesModel.findOne({_id : data?.grade}).select("totalStudents") ;
            const result = await ModulesModel.create(data) ;
            const updateAllUsers = await UsersModel.updateMany({studentUid : { $in : totalStudents }} , { $push : { lastSeenModuleDatas : `${result?.subject}/textinstruction/${result?._id}` } } , { strict: false }) ;
            return res.send(result) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createModule ;
