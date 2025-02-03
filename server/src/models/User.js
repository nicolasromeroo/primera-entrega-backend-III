
// User.js
import mongoose from "mongoose"

const userCollection = "users"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Relación con las tareas
},
    {
        timestamps: true
    })

export const userModel = mongoose.model(userCollection, userSchema)

