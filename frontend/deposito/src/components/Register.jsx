// import axios from "axios";
// import { useState } from "react"

// const Register = () => {
//     const [formData, setFormData] = useState({ username: "", password: "" });

//     const [message, setMessage] = useState("")

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Evitar recargar la página

//         try {
//             const response = await axios.post("http://localhost:8080/api/auth/register", {
//                 username: formData.username,
//                 password: formData.password,
//             });

//             // La respuesta del backend
//             console.log("Respuesta del servidor:", response.data);

//             // Muestra el mensaje en el estado
//             setMessage(response.data.message);
//         } catch (error) {
//             // Manejo de errores
//             console.error("Error al registrar:", error.response?.data || error.message);
//             setMessage(error.response?.data?.error || "Error al registrar usuario");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//                 <label htmlFor="username" className="form-label">Username</label>
//                 <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     className="form-control"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     className="form-control"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <button type="submit" className="btn btn-primary">Registrar</button>
//         </form>
//     );
// };

// export default Register

import React, { useState } from "react";

const registerUser = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/auth/register", { // Cambia la URL si es diferente
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  return response.json(); // Devuelve los datos del usuario registrado
};


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, password); // Llama a registerUser
      setMessage(`Usuario registrado exitosamente: ${data.user.username}`);
    } catch (error) {
      setMessage(error.message || "Error al registrar usuario");
    }
  };
  

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
