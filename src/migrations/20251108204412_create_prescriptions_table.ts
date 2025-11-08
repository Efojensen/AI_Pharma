import db from '../config/database/db'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query(`
            CREATE TABLE IF NOT EXISTS prescriptions (
                id SERIAL PRIMARY KEY,
                patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
                drug_id INT NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
                dosage_id INT NOT NULL REFERENCES dosages(id) ON DELETE CASCADE,
                condition_id INT REFERENCES conditions(id),
                prescribed_date DATE NOT NULL DEFAULT CURRENT_DATE,
                duration_days INT CHECK (duration_days > 0),
                instructions TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                UNIQUE(patient_id, drug_id, dosage_id, prescribed_date)  -- This is to prevent duplicate prescriptions
            )
            `)

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Migration failed:', error)
        throw error
    } finally {
        client.release()
    }
}

export async function down() {
    const client = await db.connect()

    try {
        await client.query('DROP TABLE IF EXISTS prescriptions')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Migration failed:', error)
        throw error
    } finally {
        client.release()
    }
}

up()