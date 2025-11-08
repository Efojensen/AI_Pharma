import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TYPE pt_population AS ENUM (
                'neonatal',
                'infant',
                'pediatric',
                'adolescent',
                'young adult',
                'adult',
                'geriatric',
            )

            CREATE TABLE IF NOT EXISTS drugs(
                id SERIAL PRIMARY KEY,
                pharmacy_id INT REFERENCES pharmacy(id)
                brand_name TEXT NOT NULL,
                generic_name TEXT,
                warnings TEXT,
                patient_population pt_population
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