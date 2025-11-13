import db from '../config/database/db'

export async function up() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TABLE "pharmacies"
            ALTER COLUMN "password_hash"
            DROP NOT NULL;
        `)

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Rollback migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

export async function down() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TABLE "pharmacies"
            ALTER COLUMN "password_hash"
            ADD NOT NULL;
        `)

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Rollback migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()