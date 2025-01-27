// import React, { useState } from 'react';
// import axios from 'axios';
// import "../assets/styles/styles.css";

// const TaskForm = ({ onAddTask }) => {
//     const [task, setTask] = useState({ title: '', category: '', priority: '' });

//     const handleChange = (e) => {
//         setTask({ ...task, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:8080/api/tasks', task); // task incluye title, category y priority
//             onAddTask(res.data); // Llamamos a onAddTask para agregar la nueva tarea a TaskList
//             setTask({ title: '', category: '', priority: '' }); // Limpiar formulario
//         } catch (error) {
//             console.error("Error al agregar la tarea:", error);
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit}>
//             <input name="title" placeholder="Tarea" value={task.title} onChange={handleChange} required />
//             <input name="category" placeholder="Categoría" value={task.category} onChange={handleChange} required />
//             <input name="priority" type="number" placeholder="Prioridad (%)" value={task.priority} onChange={handleChange} required />
//             <button type="submit">Agregar</button>
//         </form>
//     );
// };

// export default TaskForm;

import React, { useState } from 'react';
import axios from 'axios';
import "../assets/styles/styles.css";

const TaskForm = ({ onAddTask }) => {
    const [task, setTask] = useState({ title: '', category: '', priority: '' });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/tasks', task); // Enviar la tarea al backend
            onAddTask(res.data); // Pasa la nueva tarea al TaskManager
            setTask({ title: '', category: '', priority: '' }); // Limpiar el formulario
        } catch (error) {
            console.error("Error al agregar la tarea:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Tarea" value={task.title} onChange={handleChange} required />
            <input name="category" placeholder="Categoría" value={task.category} onChange={handleChange} required />
            <input name="priority" type="number" placeholder="Prioridad (%)" value={task.priority} onChange={handleChange} required />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TaskForm;
