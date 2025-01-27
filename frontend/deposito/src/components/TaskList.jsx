

import React from "react";
import { FaCheckCircle, FaCircle, FaUndo } from "react-icons/fa"; // Importar íconos
import axios from "axios";
import isAuthenticated from "../../../../server/src/middleware/isAuthenticated.middleware.js"
import "../assets/styles/taskList.css"


const TaskList = ({ tasks, setTasks }) => {
  const token = localStorage.getItem("token")
  const axiosInstance = isAuthenticated(); // Obtener la instancia de axios autenticada


  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {

      try {
        if (!axiosInstance) {
          throw new Error("Usuario no autenticado. Inicia sesión para continuar.");
        }

        await axiosInstance.delete(`/tasks/${taskId}`, axiosConfig);

        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  };

  // Función para alternar el estado de una tarea (completada/incompleta)
  const toggleTask = async (taskId, currentStatus) => {
    try {
      const updatedTask = await axios.put(`http://localhost:8080/api/tasks/${taskId}`, {
        completed: !currentStatus
        , axiosConfig
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Función para copiar el resumen de tareas
  const copyTaskSummary = () => {
    const date = new Date().toLocaleDateString("es-ES"); // Fecha en formato DD/MM/AAAA
    let summary = `*TAREAS ${date}*\n`;
    tasks.forEach((task) => {
      const statusIcon = task.completed ? "✅" : "🚫";
      summary += `- ${task.title} ${statusIcon}\n`;
    });

    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(summary).then(() => {
      alert("Resumen de tareas copiado al portapapeles");
    });
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className={`task ${task.completed ? "completed" : ""}`}>
            <h3>{task.title}</h3>
            <p>Categoría: {task.category}</p>
            <p>Prioridad: {task.priority}%</p>

            {/* Si la tarea está completada, mostrar "Deshacer", sino "Completar" */}
            {task.completed ? (
              <button
                className="undo-btn"
                onClick={() => toggleTask(task._id, task.completed)}
              >
                <FaUndo className="undo-icon" />
                Deshacer
              </button>
            ) : (
              <button
                className="complete-btn"
                onClick={() => toggleTask(task._id, task.completed)}
              >
                <FaCircle className="check-icon" />
                Completar
              </button>
            )}

            {/* Botón para eliminar */}
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <p>No hay tareas disponibles.</p>
      )}

      {/* Botón para copiar el resumen de tareas */}
      <button onClick={copyTaskSummary} className="copy-btn">
        Copiar Resumen de Tareas
      </button>
    </div>
  );
};

export default TaskList;
