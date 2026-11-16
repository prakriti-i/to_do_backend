import express from "express";
import { Env } from "./src/config/env.config.js";
import connectDb from "./src/config/db.config.js";
import todoRoutes from "./src/routes/todo.routes.js";
import { sampleMiddleware } from "./src/middleware/sample.middleware.js";
import userRouter from "./src/routes/user.routes.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(sampleMiddleware);
app.use(authMiddleware);
app.use("/todo",todoRoutes); 
app.usr("/user", userRouter)

app.use("/user",userRouter);    


function startServer(){
    connectDb();
    app.listen(Env.port, (err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(`Server is running on port ${Env.port}`);
    })
}


startServer();