
const jwt  = require("jsonwebtoken");
require("dotenv").config() ;

const createJwt = async (req , res) => {
    try {
        
        const data = req.body ;
        const token = jwt.sign(data , process.env.JWT_SECRET , {expiresIn : '1d'}) ;
        res.cookie("token" , token , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false ,
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' , 
        }).send({token})

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = createJwt ;
