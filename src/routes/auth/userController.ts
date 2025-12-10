import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { verifyOnePharmacy } from '../../functions/verifyPharmacy';
import { getPharmacistDetails } from '../pharmacies/pharmacyControllers';
import { GenerateToken } from '../../utils/jwt';

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

export async function loginToPharmacy(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        if (!email || !password ) {
            res.status(400).json({
                err: 'email and password are required'
            })
        }

        const details = await getPharmacistDetails(email)

        const validPassword = await bcrypt.compare(details.userPwd, password)

        if (!validPassword) {
            res.status(401).json({
                err: 'invalid email or password'
            })
            return
        }

        const token = GenerateToken(details)

        res.status(200).json({
            jwt: token,
            msg: 'login successful'
        })
    } catch (error) {
        res.status(500).json({
            err: 'something went wrong'
        })
    }
}