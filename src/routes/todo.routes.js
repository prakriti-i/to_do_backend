import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo, getMyTodo } from "../controller/todo.controller.js";
import {authMiddleware} from  "../middleware/auth.middleware.js";
const todoRoutes = Router();


// base_url/todo/
todoRoutes.post("/",authMiddleware,createTodo)  // --> route_name + controller function
todoRoutes.get("/",authMiddleware,getTodos)  
todoRoutes.get("/mine",authMiddleware,getMyTodos)  
todoRoutes.patch("/:id",updateTodo)  
todoRoutes.delete("/:id", deleteTodo) 

export default todoRoutes;