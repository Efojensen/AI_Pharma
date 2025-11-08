import db from '../config/database/db'

export async function up() {
    const client = await db.connect()

    try {
        await client.query('BEGIN')

        // Remove duplicate and fix trailing commas
        await client.query(`
            CREATE TYPE category_enum AS ENUM (
                'wholesale',
                'retail',
                'wholesale_retail'
            );
        `);

        await client.query(`
            CREATE TYPE region_enum AS ENUM (
                'upper_east',
                'upper_west',
                'north_east',
                'northern',
                'savannah',
                'bono_ahafo',
                'bono_east',
                'oti',
                'ashanti',
                'ahafo',
                'eastern',
                'volta',
                'western_north',
                'central',
                'western',
                'greater_accra'
            );
        `);

        await client.query(`
            CREATE TYPE pt_population_enum AS ENUM (
                'adult',
                'infant',
                'neonatal',
                'pediatric',
                'geriatric',
                'adolescent',
                'young_adult'
            )
        `);

        // Remove the duplicate pt_type definition
        await client.query(`
            CREATE TYPE unit_enum AS ENUM (
                'mcg',
                'mg',
                'ml',
                'g',
                'l'
            )
        `)

        await client.query(`
            CREATE TYPE form_enum AS ENUM (
                'cream',
                'drops',
                'syrup',
                'saline',
                'tablet',
                'capsule',
                'inhaler',
                'ointment',
                'injection'
            )
        `)

        await client.query(`
            CREATE TYPE route_enum AS ENUM (
                'oral',
                'otic',
                'nasal',
                'buccal',
                'rectal',
                'ocular',
                'vaginal',
                'inhaled',
                'cutaneous',
                'sublingual',
                'transdermal',
                'intravenous',
                'intrathecal',
                'subcutaneous',
                'intramuscular'
            )
        `)

        await client.query(`
            CREATE TYPE pt_type_enum AS ENUM (
                'Male',
                'Female',
                'Pregnant',
                'Postpartum'
            )
        `)

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
        throw error;
    } finally {
        client.release();
    }
}

up()