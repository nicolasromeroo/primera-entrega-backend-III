
import jwt from "jsonwebtoken"
import envsConfig from "../config/envs.config.js"

export const createToken = (user) => {
    const { username } = user 
    const token = jwt.sign({ username }, envsConfig.JWT_KEY, { expiresIn: "5m" })
    return token
}

export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, envsConfig.JWT_KEY)
    } catch (error) {
        return null
    }
}