import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { verifyOnePharmacy } from '../../functions/verifyPharmacy';

export async function verifyPharmacy(req: Request, res: Response) {
    const salt = parseInt(process.env["SALT"] || '8')
    try {
        let { pharmacy, business, password, file, email, region, location } = req.body

        if (!pharmacy || !password || !business || !email || !region || !location) {
            res.status(400).json({
                err: 'pharmacy, email, password, file and business are required'
            })
            return
        }

        password = await bcrypt.hash(password, salt)

        await verifyOnePharmacy(pharmacy, email, password, business, region, location)

        res.status(200).json({
            message: 'Pharmacy verified successfully'
        })
    } catch (error) {
        res.status(500).json({
            err: error
        })
        console.log(error)
    }
}