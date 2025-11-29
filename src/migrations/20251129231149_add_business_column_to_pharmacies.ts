import db from '../config/database/config'

export async function up() {
    const client = await db.connect()
    try {
        await client.query(`
            ALTER TABLE pharmacies
            ADD COLUMN business_type business;
        `)
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
        await db.query('DROP TABLE IF NOT EXISTS drug_chemicals')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()