import db from '../config/database/db'

export async function up() {
    try {
        await db.query(`
            CREATE TYPE UNIT AS ENUM (
                'mcg',
                'mg',
                'ml',
                'g',
                'l'
            )

            CREATE TYPE FORM AS ENUM (
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

            CREATE TYPE ROUTE AS ENUM (
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

            CREATE TABLE IF NOT EXISTS dosages(
                dosage_id SERIAL INT PRIMARY KEY,
                drug_id INT REFERENCES drugs(id),
                strength DECIMAL(10, 3)
                unit UNIT NOT NULL,
                form FORM ,
                frequency TEXT,
                route ROUTE
                condition INT REFERENCES conditions(id) --condition treated by this particular dosage
                UNIQUE(drug_id, strength, unit, form)
            )
        `)
    } catch (error) {
        console.error(error)
    }
}
