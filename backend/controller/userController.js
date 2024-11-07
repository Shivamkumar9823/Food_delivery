import { userModel } from "../models/userModel.js";
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config'


//login User

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not exist!"});
        }
        //comparing password with dB password..
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Wrong Password!"});
        }

        const token = createToken(user._id);
        res.json({success:true, token});

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
        
    }
    

};

//register user.
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


const registerUser = async (req, res) =>{
    // console.log("done registration");

    const {name , password, email} = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }
    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please Enter valid Email"})
    }
    if (!password || password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password with at least 8 characters" });
    }

    try {

        const exists = await userModel.findOne({email});   
        if(exists){
            return res.json({success:false , message:"User already exist"})
        }
        
        //Hashing user password.
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success:true, token})

          
    } catch (error) {
         console.log(error)
         res.json({success:false, message:"Error"})
    }

}

export {loginUser, registerUser}

