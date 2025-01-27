import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch inicial de tareas desde el backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/tasks');
                setTasks(res.data);  // Cargar tareas desde el servidor
            } catch (err) {
                console.error("Error al obtener las tareas:", err);
            }
        };

        fetchTasks();
    }, []);

    // Función para agregar una nueva tarea
    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);  // Agregar la nueva tarea a la lista
    };

    return (
        <div>
            <TaskForm onAddTask={addTask} />  {/* Pasa la función para agregar tareas */}
            <TaskList tasks={tasks} setTasks={setTasks}/>  {/* Pasa la lista de tareas al TaskList */}
        </div>
    );
};

export default TaskManager;
