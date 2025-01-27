
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: Number, required: true }, // Porcentaje de importancia
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
