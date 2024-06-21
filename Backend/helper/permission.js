const usermodel = require("../models/userModel")

const uploadProductPermissions = async(userId)=>{
    const user = await usermodel.findById(userId)
    if(user.role === 'Admin' ){
        return true;
    }
    return false
}

module.exports =uploadProductPermissions