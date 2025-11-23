import bcrypt from 'bcryptjs'
import db from '../../config/database/config'
import { Request, Response } from "express";

export async function verifyPharmacy(req: Request, res: Response) {
    const client = await db.connect();

    const salt = process.env["SALT"] || 8
    try {
        let { pharmacy, employees, business, password } = req.body

        if (!pharmacy || !employees || !business) {
            res.status(400).json({
                err: 'pharmacy, email, employees and business are required'
            })
            return
        }

        password = await bcrypt.hash(password, salt)

    } catch (error) {
        res.status(500).json({
            err: error
        })
        console.log(error)
    }
}