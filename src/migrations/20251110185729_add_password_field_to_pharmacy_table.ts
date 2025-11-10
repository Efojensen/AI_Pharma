import db from '../config/database/db'

export async function up() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TABLE pharmacies
            ADD COLUMN password_hash TEXT NOT NULL;
        `)

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Migration failed:', error)
        throw error;
    } finally {
        client.release()
    }
}

export async function down() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TABLE pharmacies
            DROP COLUMN password_hash;
        `)

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Migration failed:', error)
        throw error;
    } finally {
        client.release()
    }
}

up()