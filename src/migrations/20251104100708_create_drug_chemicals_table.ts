import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS drug_chemicals(
                drug_id INT REFERENCES drugs(id),
                chemical_id INT REFERENCES chemicals(id),
                quantity TEXT,
                PRIMARY KEY(drug_id, chemical_id)
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF NOT EXISTS drug_chemicals')
    } catch (error) {
        console.error(error)
    }
}

up()