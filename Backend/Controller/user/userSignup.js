const usermodel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;
        console.log(req.body);
        const user = await usermodel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Already user exits.")
        }

        if (!email) {
            return res.status(400).json({ message: "Please provide email", error: true, success: false });
        }
        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false });
        }
        if (!name) {
            return res.status(400).json({ message: "Please provide name", error: true, success: false });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const payload = {
            ...req.body,
            role:"General",
            password: hashedPassword
        };

        const userData = new usermodel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
