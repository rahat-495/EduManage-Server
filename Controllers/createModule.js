
const createModule = async (req , res) => {
    try {
        
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createModule ;
