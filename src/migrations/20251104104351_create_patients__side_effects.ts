import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS patients_to_side_effects(
                id SERIAL PRIMARY KEY
                patient_id INT REFERENCES patients(id),
                side_effects_id INT REFERENCES side_effects(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF NOT EXISTS patients_side_effects')
    } catch (error) {
        console.error(error)
    }
}

up()