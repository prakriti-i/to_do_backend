import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},{
    timestamps: true 
})

// Schema --> model
const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;