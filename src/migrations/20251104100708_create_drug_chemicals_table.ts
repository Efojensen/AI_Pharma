import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS drug_chemicals(
                drug_id INT REFERENCES drugs(id),
                chemical_id INT REFERENCES chemicals(chemical_id),
                quantity DECIMAL(10, 3) NOT NULL,
                unit unit_enum NOT NULL,
                PRIMARY KEY(drug_id, chemical_id)
            );
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