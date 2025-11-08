import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        // The condition refers to the sickness/malady
        await client.query(`
            CREATE TABLE IF NOT EXISTS conditions (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `)

        // Junction table for the many-to-many relationship
        await client.query(`
            CREATE TABLE IF NOT EXISTS drug_conditions (
                id SERIAL PRIMARY KEY,
                drug_id INT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
                condition_id INT NOT NULL REFERENCES conditions(id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                UNIQUE(drug_id, condition_id)  -- Prevent duplicates
            )
        `)

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_drug_conditions_drug_id ON drug_conditions(drug_id)
        `)
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_drug_conditions_condition_id ON drug_conditions(condition_id)
        `)

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    }
}

export async function down() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query('DROP TABLE IF EXISTS conditions')
        await client.query('DROP TABLE IF EXISTS drug_conditions')

        await client.query('DROP INDEX IF EXISTS idx_drug_conditions_drug_id')
        await client.query('DROP INDEX IF EXISTS idx_drug_conditions_condition_id')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Rollback migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()