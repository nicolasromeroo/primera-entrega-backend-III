

// utils/jwt.js
import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js";

export function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            envsConfig.JWT_KEY,
            {
                expiresIn: "1h", 
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, envsConfig.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido o expirado" });
        }

        req.user = decoded; 
        next(); 
    });
};
