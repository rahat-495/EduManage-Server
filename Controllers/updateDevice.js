
const SchoolsModel = require("../Models/SchoolsModel");
const UsersModel = require("../Models/UsersModel");

const updateDevice = async (req , res) => {
    try {
        const data = req.body ;
        const userData = await UsersModel.findOne({email : data?.email}) ;
        
        if(userData?.email){
            
            const os = userData?.devicesInfo?.find((os) => os?.deviceName === data?.devicesInfo?.deviceName && os) ;
            const date = userData?.devicesInfo?.find((os) => os?.loginDate?.includes(data?.devicesInfo?.loginDate) && os) ;
            
            if(date?.loginDate !== data?.devicesInfo?.loginDate){
                if(os?.deviceName === data?.devicesInfo?.deviceName){
                    os.loginDate = data?.devicesInfo?.loginDate ;
                    const result = await UsersModel.updateOne({email : data?.email} , { $set : { devicesInfo : userData?.devicesInfo } }) ;
                    return res.send(result) ;
                }
                else{
                    userData?.devicesInfo?.push(data?.devicesInfo)
                    const result = await UsersModel.updateOne({email : data?.email} , { $set : { devicesInfo : userData?.devicesInfo } }) ;
                    return res.send(result) ;
                }
            }
            else{
                return res.send({success : false , message : "Can't update !"}) ;
            }

        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
}

module.exports = updateDevice ;
