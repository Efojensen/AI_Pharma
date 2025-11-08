import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await db.query(`
            CREATE TABLE IF NOT EXISTS drugs(
                id SERIAL PRIMARY KEY,
                pharmacy_id INT REFERENCES pharmacies(id) ON DELETE SET NULL,
                brand_name TEXT NOT NULL,
                generic_name TEXT NOT NULL,
                warnings TEXT,
                side_effects TEXT,
                patient_population pt_population_enum,
                off_label_uses TEXT
            );
        `)

        await client.query(`
            CREATE INDEX idx_drugs_brand_name ON drugs(brand_name);
            CREATE INDEX idx_drugs_generic_name ON drugs(generic_name);
        `)

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
        await client.query('BEGIN');

        await client.query('DROP TABLE IF EXISTS drugs')

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Rollback migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()