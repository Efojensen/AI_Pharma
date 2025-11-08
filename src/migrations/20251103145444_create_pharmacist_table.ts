import db from '../config/database/db'

export async function up() {
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            CREATE TABLE pharmacists (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                pharmacy_id INTEGER REFERENCES pharmacies(id) ON DELETE SET NULL,
                license_number VARCHAR(100) UNIQUE,
                password_hash TEXT NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            )
        `);

        await client.query(`
            CREATE INDEX idx_pharmacists_pharmacy_id ON pharmacists(pharmacy_id);
            CREATE INDEX idx_pharmacists_email ON pharmacists(email);
            CREATE INDEX idx_pharmacists_active ON pharmacists(is_active) WHERE is_active = true;
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
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        await client.query('DROP INDEX IF EXISTS idx_pharmacists_pharmacy_id');
        await client.query('DROP INDEX IF EXISTS idx_pharmacists_email');
        await client.query('DROP INDEX IF EXISTS idx_pharmacists_active');
        await client.query('DROP TABLE IF EXISTS pharmacists');

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Rollback migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()