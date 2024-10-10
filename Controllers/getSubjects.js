
const GradesModel = require("../Models/GradesModel");

const getSubjects = async (req , res) => {
    try {
        const {id} = req.query ;
        const result = await GradesModel.findOne({_id : new ObjectId(id)}) ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getSubjects ;
