
// Profile.jsx
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";
import Cookies from "js-cookie";

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const completedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.completed) : [];
  const totalTasks = tasks.length;
  const performance = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }

        const response = await fetch("http://localhost:8080/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Error al obtener el perfil:', text);
          throw new Error("No se pudo cargar el perfil.");
        }

        // Verifica que la respuesta sea JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error("La respuesta no es JSON: " + text);
        }

        const data = await response.json();
        setUserData(data);

        if (!data.id) {
          throw new Error("El ID del usuario no está disponible.");
        }

        const tasksResponse = await fetch(`http://localhost:8080/api/tasks?userId=${data.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!tasksResponse.ok) {
          const text = await tasksResponse.text();
          console.error('Error al obtener las tareas:', text);
          throw new Error("No se pudo obtener las tareas.");
        }

        const tasksContentType = tasksResponse.headers.get("Content-Type");
        if (!tasksContentType || !tasksContentType.includes("application/json")) {
          const text = await tasksResponse.text();
          throw new Error("La respuesta de las tareas no es JSON: " + text);
        }

        const tasksData = await tasksResponse.json();
        if (Array.isArray(tasksData)) {
          setTasks(tasksData);
        } else {
          throw new Error("Los datos de las tareas no son un array.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!userData) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <h3>Estadísticas de Desempeño</h3>
        <p><strong>ID:</strong> {userData.id}</p>
        <p><strong>Nombre de Usuario:</strong> {userData.username}</p>
        <p><strong>Tareas Completadas:</strong> {completedTasks.length}/{totalTasks}</p>
        <p><strong>Rendimiento:</strong> {performance.toFixed(2)}%</p>
      </div>

      <TaskForm userId={userData.id} onAddTask={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Profile;
