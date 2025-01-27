import express from 'express';
import Task from '../models/Task.js';
import protect from '../middleware/auth.middleware.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

// Crear nueva tarea
router.post('/', protect, async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Marcar tarea como completada
// Actualizar tarea (completa)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, priority, completed } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ error: 'El ID de la tarea es requerido.' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, category, priority, completed },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    console.log("Eliminando tarea con ID:", req.params.id); // Verifica si llega correctamente el ID
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id); // Eliminar la tarea
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.status(200).json({ message: 'Tarea eliminada exitosamente.' });
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).json({ error: error.message });
    }
});



export default router;
