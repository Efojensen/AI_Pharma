import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS chemicals(
                chemical_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF NOT EXISTS chemicals')
    } catch (error) {
        console.error(error)
    }
}

up()