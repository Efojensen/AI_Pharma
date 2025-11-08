import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query(`
            CREATE TABLE IF NOT EXISTS dosages(
                dosage_id SERIAL PRIMARY KEY,
                drug_id INT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
                strength DECIMAL(10, 3) CHECK (strength > 0),
                unit unit_enum NOT NULL,
                form form_enum NOT NULL,
                frequency TEXT NOT NULL,
                route route_enum NOT NULL,
                UNIQUE(drug_id, strength, unit, form, route)
            )
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
        await client.query('BEGIN');

        await client.query('DROP TABLE IF EXISTS dosages')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()