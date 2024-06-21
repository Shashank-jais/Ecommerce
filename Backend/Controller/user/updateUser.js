const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser =req.userId;
        const {userId,email,name,role}=req.body
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }
        const user = await userModel.findById(sessionUser)

        const updateuser= await userModel.findByIdAndUpdate(userId, payload)


        res.status(200).json({
            data : updateuser,
            error : false,
            success : true,
            message : "User Updated"
        })

        // console.log("user",user)

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateUser