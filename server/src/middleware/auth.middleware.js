
import { verifyToken } from "../utils/jwt.js";

export default function authMiddleware(username) {
  return async (req, res, next) => {
    const token = req.cookies.token;
    const user = verifyToken(token)

    // condicional para rol de usuario
    // if (!user || (role === "admin" && user.role !== "admin") || (role === "user" && user.role !== "user")) {
    //   return res.status(403).json({ message: "Acceso no permitido" });
    // }

    req.user = user
    next()
  };
}