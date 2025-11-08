import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query(`
            CREATE TABLE IF NOT EXISTS chemicals(
                chemical_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL
            );
        `)

        await client.query(`CREATE INDEX idx_chemicals_name ON chemicals(name)`)

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

        await client.query('DROP TABLE IF NOT EXISTS chemicals')

        await client.query('DROP INDEX IF EXISTS idx_chemicals_name')

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()