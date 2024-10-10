
const AddmissionsModel = require("../Models/AddmissionsModel");

const updateAddmission = async (req , res) => {
    try {
        const {id} = req.query ;
        const data = req.body ;
        const result = await AddmissionsModel.updateOne({_id : id} , { $set : { ...data } })
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = updateAddmission ;
