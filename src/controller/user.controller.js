import bcrypt from "bcrypt";
import UserModel from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import { Env } from "../config/env.config.js";



export async function createUser(req, res){
    const {email, fullName, password} = req.body; 
    const regexExpression = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._]+\.[A-Za-z]{2,}$/ ;
    if (regexExpression.test(email) === false){
        return res.status(400).json({message: "Invalid email format"});
    }
    if(!email || !fullName ||!password ){
        return res.status(400).json({message: "All fields are required"});
    }
    const existingUser= await UserModel.findOne({email: email});
    if (existingUser){
        return res.status(400).json({message: "User already exist, please try with another email"});
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
        email: email,
        fullName: fullName,
        password:hashedPassword

    });
    if(!user){
        return res.status(500).json({message: "Internal server error"})
    }
     return res.status(201).json({
        message: "User created successfully",
    })
}




export async function loginUser(req,res) {
    const [email, password] =req.body;
    if(!email || !password){
        return res.status(400).json({message: "please provide your email and password"});
    }
    const user= await UserModel.findOne({email: email});

    if(!user){
        return res.status(404).json({message: "User not found, please register first"})
    }
    const isPasswordMatch = bcrypt.
    compareSync(password, user.password) 

    if(!isPasswordMatch){
        return res.status(401).json({message: "Invalid password, please try again"})
    }

    const payload = {
        _id: username._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    }

    const token = jwt.sign(payload, Env.jwtSecretKey, {expiresIn: "3d"});


    return res.status(200).json({
         message: "Login Successful",
        access_token: token
        })

}