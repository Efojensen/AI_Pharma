
import db from '../config/database/config'

export async function up() {
    const client = await db.connect()
    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TABLE pharmacists
            ADD COLUMN password_hash TEXT
        `);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

export async function down() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query('DROP COLUMN password_hash')

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Rollback failed:', error)
        throw error
    } finally {
        client.release()
    }
}

up()