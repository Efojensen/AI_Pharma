import db from '../config/database/db'

export async function up() {
	const client = await db.connect();

	try {
		await client.query('BEGIN');

		// Create indexes for performance
		await client.query(`
            CREATE INDEX idx_pharmacies_name ON pharmacies(name);
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
	const client = await db.connect();

	try {
		await client.query('BEGIN');

		await client.query('DROP INDEX IF EXISTS idx_pharmacies_name');

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