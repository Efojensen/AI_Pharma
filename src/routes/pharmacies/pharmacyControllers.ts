import db from '../../config/database/config'
import { Request, Response } from "express";

export async function getAvailablePharmacies(req: Request, res: Response) {
    const client = await db.connect();

    try {
        const pharmacies = await client.query(`
            SELECT name, location, region FROM pharmacies
            WHERE is_verified = FALSE
        `)

        res.json(pharmacies)
    } catch (error) {
        res.status(500).json({
            err: error
        })
        console.log(error)
    }
}