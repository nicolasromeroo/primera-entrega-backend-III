
// // TaskList.jsx
// import React, { useState, useEffect } from "react";
// import { FaCheckCircle, FaCircle, FaUndo } from "react-icons/fa";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { deleteTask } from "../../../../server/src/controllers/task.controller.js";

// const TaskList = ({ tasks = [], setTasks }) => {
//   const [loading, setLoading] = useState(true);  
//   const [error, setError] = useState(null);  

//   const getTokenFromCookies = () => Cookies.get("token"); 

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = getTokenFromCookies();
//       if (!token) {
//         setError("Token no encontrado.");
//         setLoading(false);
//         return;
//       }

//       try {
        
//         const { data } = await axios.get("http://localhost:8080/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(data);  
//       } catch (error) {
//         setError("Error al obtener tareas.");
//       } finally {
//         setLoading(false);  
//       }
//     };

//     fetchTasks();  
//   }, [setTasks]);  

//   if (loading) {
//     return <p>Cargando tareas...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (tasks.length === 0) {
//     return <p>No hay tareas.</p>;
//   }

//   return (
//     <div>
//       <h2>Lista de Tareas</h2>
//       {tasks.map((task) => (
//         <div key={task._id} className={task.completed ? "completed" : ""}>
//           <h3>{task.title}</h3>
//           <button onClick={() => toggleTask(task._id, task.completed)}>
//             {task.completed ? <FaUndo /> : <FaCircle />}
//             {task.completed ? "Deshacer" : "Completar"}
//           </button>
//           <button onClick={() => deleteTask(task._id)}>Eliminar</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskList;

// TaskList.jsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaCircle, FaUndo } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const TaskList = ({ tasks = [], setTasks }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTokenFromCookies = () => Cookies.get("token");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        setError("Token no encontrado.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:8080/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setTasks(data);
      } catch (error) {
        setError("Error al obtener tareas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

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
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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
      const { data } = await axios.put(
        `http://localhost:8080/api/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: data.completed } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;
  if (tasks.length === 0) return <p>No hay tareas.</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>
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

