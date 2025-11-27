import { Request, Response } from "express";
import db from '../../config/database/config';

export async function getAvailablePharmacies(req: Request, res: Response) {
    const client = await db.connect();

    try {
        const { search, limit = 20 } = req.query;

        const parsedLimit = parseInt(limit as string) || 20;
        const minEnforced = Math.max(parsedLimit, 1);
        const validatedLimit = Math.min(minEnforced, 100);

        const searchTerm = typeof search === 'string' ? search.trim() : '';

        let query = `
            SELECT name, location, region FROM pharmacies
            WHERE is_verified = FALSE
        `;

        const queryParams: any[] = [];

        if (searchTerm.length > 0) {
            query += ` AND name ILIKE $${queryParams.length + 1}`;
            queryParams.push(`%${searchTerm}%`);
        }

        query += ` LIMIT $${queryParams.length + 1}`;
        queryParams.push(validatedLimit);

        const result = await client.query(query, queryParams);

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                limit: validatedLimit,
                hasMore: result.rows.length === validatedLimit
            }
        });

    } catch (error) {
        console.error('Database error:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });

    } finally {
        client.release();
    }
}