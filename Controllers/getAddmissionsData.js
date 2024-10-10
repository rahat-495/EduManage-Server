
const AddmissionsModel = require("../Models/AddmissionsModel");

const getAddmissionsData = async (req , res) => {
    try {
        const {uid} = req.query ;
        const result = await AddmissionsModel.find({studentUid : uid}) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getAddmissionsData ;
