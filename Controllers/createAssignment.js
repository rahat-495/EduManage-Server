
const AssignmentModel = require("../Models/AssignmentsModel");

const createAssignment = async (req , res) => {
    try {
        
        const data = req.body ;
        const result = await AssignmentModel.create(data) ;
        return res.send(result) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createAssignment ;
