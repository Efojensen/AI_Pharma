import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TYPE pharmacy_category AS ENUM ('wholesale', 'retail', 'wholesale/retail')

		    CREATE TYPE region AS ENUM (
		    	'upper east',
		    	'upper west',
		    	'north east',
		    	'northern',
		    	'savannah',
		    	'bono ahafo',
		    	'bono east',
		    	'oti',
		    	'ashanti',
		    	'ahafo',
		    	'eastern',
		    	'volta',
		    	'western north',
		    	'central',
		    	'western',
		    	'greater accra'
		    )

            CREATE TABLE pharmacies IF NOT EXISTS (
                id SERIAL PRIMARY KEY,
			    name TEXT NOT NULL,
			    category pharmacy_category NOT NULL,
			    password TEXT NOT NULL,
			    location TEXT NOT NULL,
			    license_number TEXT UNIQUE NOT NULL,
			    region region NOT NULL,
			    mmda TEXT
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
    } catch (error) {
        console.error(error)
    }
}

export async function down() {
    try {
        await db.query('DROP TABLE IF EXISTS pharmacies')
    } catch (error) {
        console.error(error)
    }
}

up()