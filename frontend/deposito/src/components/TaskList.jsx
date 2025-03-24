// TasList.jsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaCircle, FaUndo } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const TaskList = ({ tasks = [], setTasks }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState(""); // ⬅️ Estado para la nueva tarea

  const getTokenFromCookies = () => Cookies.get("token");

  // ✅ Función para obtener tareas reutilizable
  const fetchTasks = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      setError("Token no encontrado.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("Respuesta de la API:", response.data);

      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        setError("Error: las tareas no son un array.");
      }
    } catch (error) {
      setError("Error al obtener tareas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Llama a la función al montar el componente
  }, []);

  // ✅ Función para agregar una nueva tarea
  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = getTokenFromCookies();
    if (!token) {
      setError("Token no encontrado.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/tasks",
        { title: newTask },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      // ✅ Vuelve a obtener la lista de tareas actualizada
      fetchTasks();
      setNewTask(""); // Limpia el campo de entrada
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const handleDelete = async (taskId) => {
    const token = getTokenFromCookies();
    if (!token) {
      setError("Token no encontrado.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchTasks(); // ✅ Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const toggleTask = async (taskId, completed) => {
    const token = getTokenFromCookies();
    if (!token) {
      setError("Token no encontrado.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      fetchTasks(); // ✅ Actualiza la lista después de marcar/desmarcar
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;
  if (!Array.isArray(tasks) || tasks.length === 0) return <p>No hay tareas.</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {/* ✅ Formulario para agregar tareas */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          required
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de tareas */}
      {tasks.map((task) => (
        <div key={task._id} className={task.completed ? "completed" : ""}>
          <h3>{task.title}</h3>
          <button onClick={() => toggleTask(task._id, task.completed)}>
            {task.completed ? <FaUndo /> : <FaCircle />}
            {task.completed ? "Deshacer" : "Completar"}
          </button>
          <button onClick={() => handleDelete(task._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
