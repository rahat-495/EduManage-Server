
const SchoolsModel = require("../Models/SchoolsModel");

const getYourSchools = async (req , res) => {
    try {
        const {email} = req.query ;
        const result = await SchoolsModel.find({email}).toArray() ;
        res.send(result) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = getYourSchools ;
