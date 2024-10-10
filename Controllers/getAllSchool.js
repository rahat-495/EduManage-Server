
const SchoolsModel = require("../Models/SchoolsModel");

const getAllSchool = async (req , res) => {
    try {
        const result = await SchoolsModel.find() ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getAllSchool ;
