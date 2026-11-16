import jwt from "jsonwebtoken";
import {Env} from "../config/env.config";
import UserModel from "../models/user.models";

export async function authMiddleware(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token =bearerToken.split(" ")[0] ==="Bearer" ? bearerToken.split(" ")[1] : bearerToken
    
    if(!token){
        return res.status(401).json({message: "Unauthorized, please provide a valid token"});
    }

    const decodedPayload = jwt.verify(token, Env.jwtSecretKey);

    const user = await UserModel.findOne({_id: decodedPayload._id});

    if(!user){
        return res.status(402).json({message: "Unauthorized, user not found"})
    }

    //attach user to rquest object
    req.user= {
        _id: user._id,
        email:user.email,
        role: user
    }   //password lai attach nagarne, security ko lagi

    console.log("User attached to request:", req.user);

    next();
    
}

