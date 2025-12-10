import jwt, { JwtPayload } from "jsonwebtoken";
import { PharmacistDetails } from "../types/types";

const JWT_SECRET = process.env['JWT_SECRET'] || 'some-other-secret'

export const GenerateToken = (payload: PharmacistDetails) => {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'ES256',
        expiresIn: '7d'
    });
}

export const VerifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (error) {
        throw new Error('invalid or expired jwt')
    }
}