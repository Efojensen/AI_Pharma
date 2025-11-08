import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`

            CREATE TYPE pt_type AS ENUM (
                'Male',
                'Female',
                'Pregnant',
                'Postpartum',
            )

            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                drug_id INT REFERENCES drugs(id),
                patient_type pt_type,
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS patients')
    } catch (error) {
        console.error(error)
    }
}

up()