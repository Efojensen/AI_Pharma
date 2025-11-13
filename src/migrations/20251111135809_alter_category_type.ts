import db from '../config/database/db'

export async function up() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            ALTER TYPE "category_enum"
            ADD VALUE 'manufacturing_w';
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
            ALTER TYPE "category_enum"
            REMOVE VALUE 'manufacturing_w"
        `)
    } catch (error) {
        await client.query('ROLLBACK');
		console.error('Rollback migration failed:', error);
		throw error;
	} finally {
		client.release();
	}
}

up()