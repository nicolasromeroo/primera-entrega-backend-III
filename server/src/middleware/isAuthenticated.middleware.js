

// import axios from "axios";

// const secretKey = 'tu_clave_secreta';

// // verificar autenticación
// const isAuthenticated = () => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');  // Extraer token del encabezado
//   if (!token) {
//     console.error("No hay token disponible. Usuario no autenticado.");
//     return null;
//   }

//   // instancia de axios con el token en los headers
//   const axiosInstance = axios.create({
//     baseURL: "http://localhost:8080/api", // Cambia esto según tu configuración
//     headers: {
//       Authorization: `Bearer ${token}`, // Enviar el token en las solicitudes protegidas
//     },
//   });

//   return axiosInstance;
// };

// export default isAuthenticated;

import axios from "axios";

// Función que crea una instancia de axios con el token
const isAuthenticated = () => {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token'); // Si guardaste el token con 'token' como clave

  if (!token) {
    console.error("No hay token disponible. Usuario no autenticado.");
    return null; // Si no hay token, no se puede continuar
  }

  // Crear instancia de axios con el token en los headers
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Dirección del backend
    headers: {
      Authorization: `Bearer ${token}`, // Incluir el token en el header de cada solicitud
    },
  });

  return axiosInstance;
};

export default isAuthenticated;
