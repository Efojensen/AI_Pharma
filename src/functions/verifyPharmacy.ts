import db from '../config/database/config'

export async function verifyOnePharmacy(receivedPharmacy: string, email: string, pwdHash: string, business: string, region: string, location: string) {
    const client = await db.connect();

    business = business.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '_');
    region = region.toLowerCase().replaceAll(' ', '_');

    try {
        const query = `
            UPDATE pharmacies
            SET is_verified = TRUE, email = $1, password_hash = $2, business_type = $3, updated_at TIMESTAMPTZ DEFAULT NOW()
            WHERE name = $4 AND region = $5 and location = $6;
        `;

        await client.query(query, [email, pwdHash, business, receivedPharmacy, region, location]);

    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the controller
    } finally {
        client.release();
    }
}