import bcrypt from 'bcryptjs'
import { Request, Response } from "express";

export async function registerPharmacist(req: Request, res: Response) {
    const salt = process.env["SALT"] || 8
    try {
        let { pharmacy, email, employees, business, password } = req.body

        if (!pharmacy || !email || !employees || !business) {
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