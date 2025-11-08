import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TYPE severity AS ENUM (
                'mild',
                'moderate',
                'severe',
                'life threatening'
            )

            CREATE TABLE IF NOT EXISTS side_effects(
                id SERIAL PRIMARY KEY,
                symptom TEXT NOT NULL,
                degree severity NOT NULL
		    )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF NOT EXISTS side_effects')
    } catch (error) {
        console.error(error)
    }
}

up()