
import db from '../config/database/config'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query(`
            CREATE TYPE business AS ENUM (
                'inventory_management',
                'business_consultancy_and_strategy',
                'investment_and_financial_planning',
                'training_and_capacity_building',
                'marketing_pr_or_sponsorship',
                'software_development_and_customization',
                'customer_support_and_maintenance'
                );
            `);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

export async function down() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query('DROP TYPE IF EXISTS business')

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Rollback failed:', error)
        throw error
    } finally {
        client.release()
    }
}

up()