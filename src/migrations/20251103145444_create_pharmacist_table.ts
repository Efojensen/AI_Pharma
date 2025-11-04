import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS pharmacists (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                title varchar(255) NOT NULL,
                pharmacy_id INT REFERENCES pharmacy(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            )
        `)
    } catch(error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS pharmacists')
    } catch (error) {
        console.error(error)
    }
}

up()