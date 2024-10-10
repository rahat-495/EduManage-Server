
const AddmissionsModel = require("../Models/AddmissionsModel");

const getCurrentAddissionFormData = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await AddmissionsModel.findOne({_id : new ObjectId(id)}) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getCurrentAddissionFormData ;
