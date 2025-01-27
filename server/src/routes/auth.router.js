
import { Router } from "express"
import { register, login } from "../controllers/auth.controller.js";

const router = Router()

router.post("/register", register);
router.post("/login", login);

export default router


// // Verificación de autenticación
// router.get('/profile', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).send({ message: 'No autenticado' });

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET);
//         res.send({ message: 'Autenticado', username: decoded.username });
//     } catch {
//         res.status(401).send({ message: 'Token inválido' });
//     }
// });
