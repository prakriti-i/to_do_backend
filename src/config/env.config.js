import dotenv from "dotenv";
dotenv.config();


export const Env = {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DATABASE_CONNECTION_STRING,
    jwtSecretKey: process.env.JWT_SECRET_KEY
}