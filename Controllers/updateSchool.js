
const SchoolsModel = require("../Models/SchoolsModel");

const updateSchool = async (req , res) => {
    try {
        const {id} = req.query ;
        const updatedData = req.body ;
        const result = await SchoolsModel.updateOne({_id : id} , { $set : { ...updatedData } }) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = updateSchool ;
