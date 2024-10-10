
const SchoolsModel = require("../Models/SchoolsModel");

const getSchoolDetails = async (req , res) => {
    try {
        const {id} = req.query ;
        if(id){
            const result = await SchoolsModel.findOne({_id : id}) ;
            return res.send(result) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getSchoolDetails ;
