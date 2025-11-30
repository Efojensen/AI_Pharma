import db from '../config/database/config'

export async function verifyOnePharmacy(receivedPharmacy: string, email: string, pwdHash: string, business: string) {
    const client = await db.connect();

    business = business.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '_');

    switch (business) {
        case 'inventory_management':
            business = 'inventory_management'
            break;
        case 'business_consultancy_and_strategy':
            business = 'business_consultancy_and_strategy'
            break;
        case 'investment_and_financial_planning':
            business = 'investment_and_financial_planning'
            break;
        case 'training_and_capacity_building':
            business = 'training_and_capacity_building'
            break;
        case 'marketing_pr_or_sponsorship':
            business = 'marketing_pr_or_sponsorship'
            break;
        case 'software_development_and_customization':
            business = 'software_development_and_customization'
            break;
            case 'customer_support_and_maintenance':
            business = 'customer_support_and_maintenance'
            break;
            default:
                business = 'inventory_management'
            break;
        }

    try {
        const query = `
            UPDATE pharmacies
            SET is_verified = TRUE, email = $1, password_hash = $2, business_type = $3
            WHERE name = $4;
        `;

        await client.query(query, [email, pwdHash, business, receivedPharmacy]);

    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the controller
    } finally {
        client.release();
    }
}