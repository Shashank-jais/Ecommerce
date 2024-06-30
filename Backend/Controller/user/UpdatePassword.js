const bcrypt = require('bcryptjs');
const usermodel = require('../../models/userModel');

const UpdatePassword = async(req,res) => {
    try{
        const { email, password} = req.body;
        // console.log("Updated",password);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const updatePassword = await usermodel.updateOne({ email},{password:hashedPassword});

        // console.log("Updated password",updatePassword)
        res.json({
            message : "Password updated successfully",
            data : updatePassword,
            error : false,
            success : true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = UpdatePassword;