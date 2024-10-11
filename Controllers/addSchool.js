
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const addSchool = async (req , res) => {
    try {
        const data = req.body ;
        const result = await SchoolsModel.create(data) ;
        const userData = await UsersModel.findOne({email : result?.email}) ;
        userData?.schools?.push(result?._id);
        await UsersModel.updateOne({email : data?.email} , { $set : { schools : userData?.schools } });
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = addSchool ;
