import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                first_name TEXT,
                last_name TEXT,
                date_of_birth DATE,
                patient_type pt_type_enum,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `)

        await client.query('COMMIT')
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
        await db.query('DROP TABLE IF EXISTS patients')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()