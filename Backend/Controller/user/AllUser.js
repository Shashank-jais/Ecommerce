const userModel = require("../../models/userModel")

async function AllUser(req,res){
    try{
        const users=await userModel.find();
        res.json({
            message:"All users found",
            data:users,
            success:true,
            error:false

        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = AllUser;