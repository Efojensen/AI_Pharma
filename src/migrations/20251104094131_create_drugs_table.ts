import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TYPE PT_POPULATION AS ENUM (
                'adult',
                'infant',
                'neonatal',
                'pediatric',
                'geriatric',
                'adolescent',
                'young adult',
            )

            CREATE TABLE IF NOT EXISTS drugs(
                id SERIAL PRIMARY KEY,
                pharmacy_id INT REFERENCES pharmacy(id)
                brand_name TEXT NOT NULL,
                generic_name TEXT,
                warnings TEXT,
                side_effects INT REFERENCES side_effects(id),
                approved_indications INT REFERENCES conditions(id),
                patient_population PT_POPULATION,
                off_label_uses TEXT,
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS drugs')
    } catch (error) {
        console.error(error)
    }
}

up()