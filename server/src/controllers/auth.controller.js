
import bcrypt from "bcrypt"
import { userDao } from "../dao/user.dao.js"
import { createToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/hashPassword.js";

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await userDao.getByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userDao.create({
            username,
            password: hashedPassword,
        });

        const token = createToken(newUser)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 360000
        })

        res.status(201).json({ user: newUser, token });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userDao.getByUsername(username);
        if (!user) {
            return res.status(400).json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        // Utiliza la función isValidPassword para la comparación
        const isMatch = isValidPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        const token = createToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Asegúrate de que tu servidor esté usando HTTPS si usas secure: true
            maxAge: 3600000  // 1 hora de duración
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};