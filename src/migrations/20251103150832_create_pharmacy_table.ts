import db from '../config/database/db'

export async function up() {
	const client = await db.connect();

	try {
		await client.query('BEGIN');

		// password_hash TEXT NOT NULL, -- Storing hash instead of plain text
		await client.query(`
            CREATE TABLE IF NOT EXISTS pharmacies (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                category category_enum NOT NULL,
                location TEXT NOT NULL,
                license_number TEXT UNIQUE NOT NULL,
                region region_enum NOT NULL,
                mmda TEXT,
                is_verified BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                phone_number VARCHAR(20),
                email VARCHAR(255),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

		// Create indexes for performance
		await client.query(`
            CREATE INDEX idx_pharmacies_region ON pharmacies(region);
            CREATE INDEX idx_pharmacies_category ON pharmacies(category);
            CREATE INDEX idx_pharmacies_license_number ON pharmacies(license_number);
            CREATE INDEX idx_pharmacies_is_active ON pharmacies(is_active) WHERE is_active = true;
            CREATE INDEX idx_pharmacies_is_verified ON pharmacies(is_verified) WHERE is_verified = true;
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

		await client.query('DROP TABLE IF EXISTS pharmacies');

		await client.query('DROP INDEX IF EXISTS idx_pharmacies_region');
		await client.query('DROP INDEX IF EXISTS idx_pharmacies_category');
		await client.query('DROP INDEX IF EXISTS idx_pharmacies_license_number');
		await client.query('DROP INDEX IF EXISTS idx_pharmacies_is_active');
		await client.query('DROP INDEX IF EXISTS idx_pharmacies_is_verified');
		await client.query('DROP INDEX IF EXISTS idx_pharmacies_location');


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