import db from '../config/database/db'

export async function up() {
    try {
        // The condition refers to the sickness/malady
        await db.query(`
            CREATE TABLE IF NOT EXISTS conditions (
                id SERIAL PRIMARY KEY
                condition TEXT NOT NULL
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS conditions')
    } catch (error) {
        console.error(error)
    }
}

up()